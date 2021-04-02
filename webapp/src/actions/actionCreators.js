import {
    RECEIVED_CLUSTERS, LOADING, ERROR, CLUSTER_CLICKED
} from './types';

export const receiveClusters = clusters => ({
    type: RECEIVED_CLUSTERS,
    payload: clusters
})

export const startLoading = () => ({
    type: LOADING,
    payload: true  
})

export const stopLoading = () => ({
    type: LOADING,
    payload: false  
})

export const displayError = () =>({
    type: ERROR,
    payload: true
})

export const hideError = () => ({
    type: ERROR,
    payload: false
})

export const clusterClicked = (id, onChart = false) => ({
    type: CLUSTER_CLICKED,
    payload: {id: id, onChart: onChart}
})