export const sampleTreeData = {
  name: "",
  children: [
    {
      name: "Column with rules",
      metadata: {
        id: 1,
        dataset_filters: [],
      },
      children: [
        {
          name: "date",
          metadata: {
            id: 2,
            checked: false,
            column_filters: [],
          },
          children: [
            {
              name: "expect_column_values_to_be_null",
              metadata: {
                id: 3,
                value: true,
                filter: [],
                parentName: "date",
                checked: true,
              },
            },
            {
              name: "expect_column_values_to_be_unique",
              metadata: {
                id: 4,
                value: true,
                filter: [],
                parentName: "date",
                checked: false,
              },
            },
            {
              name: "row_count",
              metadata: {
                id: 5,
                value: 4,
                filter: [],
                parentName: "date",
                checked: true,
              },
            },
          ],
        },
        {
          name: "key",
          metadata: {
            id: 6,
            checked: false,
            column_filters: [],
          },
          children: [
            {
              name: "expect_column_values_to_be_null",
              metadata: {
                id: 7,
                value: true,
                filter: [],
                parentName: "key",
                checked: true,
              },
            },
            {
              name: "expect_column_values_to_be_unique",
              metadata: {
                id: 8,
                value: true,
                filter: [],
                parentName: "key",
                checked: false,
              },
            },
            {
              name: "row_count",
              metadata: {
                id: 9,
                value: 4,
                filter: [],
                parentName: "key",
                checked: true,
              },
            },
            {
              name: "no_of_distinct_values",
              metadata: {
                id: 10,
                value: "394308",
                filter: [],
                parentName: "key",
                checked: false,
              },
            },
          ],
        },
        {
          name: "value",
          metadata: {
            id: 11,
            checked: false,
            column_filters: [],
          },
          children: [
            {
              name: "expect_column_values_to_be_null",
              metadata: {
                id: 12,
                value: true,
                filter: [],
                parentName: "value",
                checked: true,
              },
            },
            {
              name: "expect_column_values_to_be_unique",
              metadata: {
                id: 13,
                value: true,
                filter: [],
                parentName: "value",
                checked: false,
              },
            },
            {
              name: "row_count",
              metadata: {
                id: 14,
                value: 4,
                filter: [],
                parentName: "key",
                checked: true,
              },
            },
            {
              name: "no_of_distinct_values",
              metadata: {
                id: 15,
                value: "394308",
                filter: [],
                parentName: "value",
                checked: true,
              },
            },
          ],
        },
      ],
    },
  ],
  selectedIds: [5, 3, 8, 2],
};
