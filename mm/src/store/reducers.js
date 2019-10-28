import { ADD_LIST } from './type';

export const shopList = (state = { list: [] }, actions) => {
    switch (actions.type) {
        case ADD_LIST:
            {
                let ind = state.list.findIndex(item => item.name === actions.obj.obj.name);
                if (ind == -1) {
                    //第一次添加
                    state.list.push({...actions.obj.obj });
                } else {
                    //重复添加
                    if (actions.obj.obj.count <= 0) {
                        state.list.splice(ind, 1);

                    } else {
                        state.list[ind].count = actions.obj.obj.count;
                    }

                }
            }
            return {
                ...state,
                list: [...state.list]
            }
        default:
            return {
                ...state,
                list: [...state.list]
            }
    }

}