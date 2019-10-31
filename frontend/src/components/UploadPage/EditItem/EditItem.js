import React from 'react';
import { Grid, Header} from 'semantic-ui-react';

const EditItem =(props) => {
    if (props.progress >= 1){
        return(
            <div class="ui olive segment">
                <Header style={{ 'font-size': '2em',  "margin-left":"10px" }} size="huge" color="olive">2. Edit Your Survey</Header>
                <div style={{"font-size":"22px", "margin-bottom":"10px", "margin-left":"17px", "color":"#663300"}}><strong>Title:</strong></div>
                <div style={{"font-size":"21px", "margin-bottom":"10px", "margin-left":"17px","color":"#663300"}}><strong>Items:</strong></div>
                
                <Grid columns={1}>
                <Grid.Row>
                    <h3 class="ui checkbox" style={{'margin-left':"32px", 'margin-top':'5px', 'margin-bottom':'5px'}}>
                        <input type="checkbox" name="example" />
                        <label > Item Name1 </label>
                    </h3>
                    </Grid.Row>
                <Grid.Row>
                    <h3 class="ui checkbox" style={{'margin-left':"32px", 'margin-top':'5px', 'margin-bottom':'5px'}}>
                        <input type="checkbox" name="example" />
                        <label > Item Name2 </label>
                    </h3>
                </Grid.Row>
                <Grid.Row>
                    <h3 class="ui checkbox" style={{'margin-left':"32px", 'margin-top':'5px', 'margin-bottom':'5px'}}>
                        <input type="checkbox" name="example" />
                        <label > Item Name3 </label>
                    </h3>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column align="right">
                        <button 
                            align="right" 
                            class="ui olive button" 
                            style={{"margin-top":"15px","marginRight":"20pt", "width":"100pt"}}
                            onClick = {props.editOnClick}
                            disabled = {props.progress != 1}
                        > Continue </button>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}
export default EditItem;