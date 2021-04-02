from sklearn.metrics.pairwise import cosine_similarity
from sklearn.manifold import MDS
from sklearn.feature_extraction.text import TfidfVectorizer
from replaceall import replaceall
from log_mine import LogMine
import re


class Cluster():
    def ___init__(self, pattern, count, logs, position):
        self.pattern = pattern
        self.count = count
        self.logs = logs
        self.position = position


def get_clusters(text):
    variables = ['<timestamp>:/\\d{2}\\.\\d{2}\\.\\d{4} \\d{2}:\\d{2}:\\d{2}\\.\\d{3}/', '<IP>:/\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}/',
                 '<URL>:/(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})/', '<path>:/(?<!HTTP)\\/[^\\s,\\]]+/', '<instance_id>:/@[\\d\\w]{2,}/', '<number>:/\\d{2,}/']

    log_miner = LogMine(min_members=1, max_dist=0.2, variables=variables)
    clusters = log_miner.run_with_string(text)
    clusters = sorted(clusters, key=lambda c: c.count, reverse=True)
    clusters = [cluster for cluster in clusters if cluster.pattern.strip()]

    patterns = _preprocess_patterns(clusters)
    positions = _get_positions(patterns)
    return [Cluster(pattern, cluster.count, cluster.logs, position) for pattern, cluster, position in zip(patterns, clusters, positions)]


def __preprocess_patterns(clusters):
    to_remove = ['<timestamp>', '<IP>', '<URL>', '<path>',
                 '<instance_id>', '<number>', '---', '[', ']', '(', ')']
    to_replace_with_space = ['.', ',', '=']

    patterns = [cluster.pattern for cluster in clusters]
    patterns_preprocessed = [replaceall(pattern, to_remove, '')
                             for pattern in patterns]
    patterns_preprocessed = [replaceall(
        pattern, to_replace_with_space, ' ') for pattern in patterns_preprocessed]
    patterns_preprocessed = [re.sub(r'\\s+', ' ', pattern).strip().lower()
                             for pattern in patterns_preprocessed]
    return patterns


def __get_positions(patterns):
    tfidf = TfidfVectorizer().fit_transform(patterns)

    cosine_similarities = cosine_similarity(tfidf, tfidf)

    cosine_dissimilarities = 1 - cosine_similarities
    mds = MDS(n_components=2, dissimilarity='precomputed')
    return mds.fit_transform(cosine_dissimilarities).tolist()
