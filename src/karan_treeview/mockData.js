export const apiEditorData = {
  date: {
    optional: {
      expect_column_values_to_be_null: {
        value: false,
        filter: ["date_filter1", "date_filter2"],
      },
      expect_column_values_to_be_unique: {
        value: true,
        filter: ["date_filter3", "date_filter4"],
      },
    },
    row_count: {
      value: 100,
      filter: ["date_filter5"],
    },
    column_filters: ["row_count", "expect_column_values_to_be_null"],
  },
  key: {
    optional: {
      expect_column_values_to_be_null: {
        value: false,
        filter: ["key_filter1", "key_filter2"],
      },
      expect_column_values_to_be_unique: {
        value: true,
        filter: ["key_filter3", "key_filter4"],
      },
    },
    row_count: {
      value: 200,
      filter: ["key_filter5"],
    },
    no_of_distinct_values: {
      value: "1500",
      filter: ["key_filter6"],
    },
    column_filters: ["key_filter7"],
  },
  value: {
    optional: {
      expect_column_values_to_be_null: {
        value: true,
        filter: ["value_filter1", "value_filter2"],
      },
      expect_column_values_to_be_unique: {
        value: false,
        filter: ["value_filter3", "value_filter4"],
      },
    },
    row_count: {
      value: 300,
      filter: ["value_filter5"],
    },
    no_of_distinct_values: {
      value: "2500",
      filter: ["value_filter6"],
    },
    column_filters: ["value_filter7"],
  },
  List_of_columns: ["date", "key", "value"],
  dataset_filters: ["dataset_filter1", "dataset_filter2"],
};
