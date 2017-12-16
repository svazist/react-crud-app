export default function stateMiddleware(){
    return function (_ref) {
        var dispatch = _ref.dispatch;
        var getState = _ref.getState;
        return function (next) {
            return function (action) {
                if (typeof action === 'function') {
                    return action({dispatch:dispatch,getState:getState});
                }
                return next(action);
            };
        };
    };
}