const contentModel = require("../models/contentModel");

const dynamicQuery = async ({ query }) => {
  const pipeline = buildDynamicPipeline({ query });
  const contents = await contentModel.dynamicQuery(pipeline);
  return contents;
};

const buildDynamicPipeline = ({ query }) => {
  const pipeline = [
    {
      $match: {
        data: {
          $elemMatch: {
            $and: query.map((condition) => {
              return {
                [condition.field]: {
                  [`$${condition.operation}`]: condition.value,
                },
              };
            }),
          },
        },
      },
    },
    {
      $project: {
        category: 1,
        filteredData: {
          $filter: {
            input: "$data",
            as: "item",
            cond: {
              $and: query.map((condition) => {
                return {
                  [`$${condition.operation}`]: [
                    "$$item." + condition.field,
                    condition.value,
                  ],
                };
              }),
            },
          },
        },
      },
    },
  ];

  return pipeline;
};

module.exports = {
  dynamicQuery,
};
