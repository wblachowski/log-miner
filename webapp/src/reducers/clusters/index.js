import {RECEIVED_CLUSTERS, CLUSTER_CLICKED} from '../../actions/types';

export const clusters = (state = null, { type, payload: data}) => {
    switch (type) {
        case RECEIVED_CLUSTERS:
            return data;
        default:
            return state;
    }
};

export const clusterClicked = (state = null, { type, payload: data}) => {
    switch (type) {
        case CLUSTER_CLICKED:
            return data;
        default:
            return state;
    }
};