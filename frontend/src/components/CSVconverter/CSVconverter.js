import React from 'react'
import PapaParse from 'papaparse'
import moment from 'moment'


const CSVconverter = (func, data, type) => {
  let return_data = {}

  const parse_data = (raw_data) => {
    var return_data = []
    raw_data.map(((row, row_index) => {
      if(row_index==0){
        row.map((col, col_index) => {
          return_data[col_index]={}
          return_data[col_index]['response'] = []
          return_data[col_index]['title'] = col
          return_data[col_index]['question_type'] = null
        })
      }
      else{
        row.map((col, col_index) => {
          return_data[col_index]['response'][row_index-1]={}
          return_data[col_index]['response'][row_index-1]['respondant_id']=row_index
          return_data[col_index]['response'][row_index-1]['content']= col
        })
      }
      return row;
    }))
    return return_data
  }

  const complete = (results, file) => {
    return_data['item'] = parse_data(results.data);
    return_data['title']=file.name
    return_data['author']=null
    return_data['upload_data']=moment(new Date()).format("YYYY/MM/DD").toString();
    return_data['survey_start_date']=null;
    return_data['survey_end_date']=null;
    return_data['content']=null;
    return_data['respondant_count'] = return_data['item'][0]['response'].length
    console.log(return_data)
    func(return_data);
    
    

  }

  if(type){
    PapaParse.parse(data, {
      error : () => (console.log("error occured")),
      complete : complete,
      header : false,
    })
  }
  else {

    return_data = []
    return_data[0]=[]
    data['item'].map((row, row_index) => {
      console.log(return_data)
      row['response'].map((col, col_index) => {
        if(row_index==0){
          return_data[col_index+1]=[]
        }
        if(col_index==0){
          return_data[0][row_index]=row['title'];
        }
        return_data[col['respondant_id']][row_index] = col['content']
        }
      )
    })

    func(return_data)
  }


  

}

export default CSVconverter