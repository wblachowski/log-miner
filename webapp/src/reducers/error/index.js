import {ERROR} from '../../actions/types';

const error = (state = null, { type, payload: data}) => {
    switch (type) {
        case ERROR:
            return data;
        default:
            return state;
    }
};

export default error;