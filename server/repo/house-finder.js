import Sequelize from "sequelize";
import deepmerge from "deepmerge";
import { setDefaultValue } from "../utils/object";

import db from "../models/db";
import houseFilter from "./house-filter";

const { and } = Sequelize.Op;
const { house } = db;

const defaultOptions = {
    exclude: ["id", "created_at", "updated_at"],
    limit: 10,
    raw: true,
    logging: false
};

// 모든 필터의 검색 조건을 합친다.
function mergeFilters(filters, options) {
    const filterData = Object.entries(filters);
    const mergeReducer = (acc, filter) => {
        let [name, value] = filter;
        if (!value.length) {
            value = [value];
        }
        return deepmerge(acc, houseFilter[name](...value));
    };
    const mergedFilter = filterData.reduce(mergeReducer, {});
    const mergedOptions = Object.assign(mergedFilter, options);

    mergedOptions.where = { [and]: mergedOptions.where };

    return mergedOptions;
}

export default {
    async find(filters, options) {
        const findOptions = mergeFilters(filters, options);
        setDefaultValue(findOptions, defaultOptions);

        let row;
        try {
            row = await house.findAll(findOptions);
        } catch (err) {
            db.errorHandler(err);
        }

        return row;
    }
};
