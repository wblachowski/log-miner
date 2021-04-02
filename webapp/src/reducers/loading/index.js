import {LOADING} from '../../actions/types';

const loading = (state = null, { type, payload: data}) => {
    switch (type) {
        case LOADING:
            return data;
        default:
            return state;
    }
};

export default loading;