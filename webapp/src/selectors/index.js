export const getClusters = ({ clusters }) => clusters;
export const getLoading = ({ loading }) => loading;
export const getError = ({ error }) => error;
export const getClusterClicked = ({clusterClicked}) => ({clusterClickedId: clusterClicked?.id, onChart: !!clusterClicked?.onChart})