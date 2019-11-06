import PapaParse from 'papaparse';
import moment from 'moment';


const CSVconverter = (func, data, type) => {
  let return_data = {};

  const parse_data = (raw_data) => {
    const parsed_data = [];
    raw_data.map(((row, row_index) => {
      if (row_index == 0) {
        row.map((col, col_index) => {
          parsed_data[col_index] = {};
          parsed_data[col_index].response = [];
          parsed_data[col_index].title = col;
          parsed_data[col_index].question_type = null;
          return col;
        });
      } else {
        row.map((col, col_index) => {
          parsed_data[col_index].response[row_index - 1] = {};
          parsed_data[col_index].response[row_index - 1].respondant_id = row_index;
          parsed_data[col_index].response[row_index - 1].content = col;
          return col;
        });
      }
      return row;
    }));
    return parsed_data;
  };

  const complete = (results, file) => {
    return_data.item = parse_data(results.data);
    return_data.title = file.name;
    return_data.author = null;
    return_data.upload_date = moment(new Date()).format('YYYY/MM/DD').toString();
    return_data.survey_start_date = null;
    return_data.survey_end_date = null;
    return_data.content = null;
    return_data.respondant_count = return_data.item[0].response.length;
    func(return_data);
  };

  if (type) {
    PapaParse.parse(data, {
      complete,
      header: false,
    });
  } else {
    const col_num = data.item.length;
    const row_num = data.item[0].response.length + 1;
    const return_array = Array(row_num);
    for (let i = 0; i < row_num; i++) return_array[i] = Array(col_num);
    data.item.map((item, index) => {
      return_array[0][index] = item.title;
      item.response.map((response) => {
        return_array[response.respondant_id][index] = response.content;
        return response;
      });
      return item;
    });
    
    return_data = return_array.map(e => e.join(',')).join('\n');

    func(return_data);
  }
};

export default CSVconverter;
