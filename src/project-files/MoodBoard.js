import React from 'react'
import { Form, Grid, Header } from 'semantic-ui-react'

class MoodBoard extends React.Component {
  state={

  }

  render(){
    return(
      <Grid.Row centered>
        <Header as='h2'>Mood Board </Header>
        <Form.Input type='file'/>
      </Grid.Row>
    )
  }
}

export default MoodBoard
