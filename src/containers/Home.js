import React from 'react'
import Splash from './Splash'
import { Container, Grid, Visibility } from 'semantic-ui-react'

class Home extends React.Component {
  render(){
    return(
      <div>
      <Splash />
      <Visibility>
      <Container>
        <Grid centered>
          <Grid.Row column={3}>
            <Grid.Column>Heres som estuff</Grid.Column>
            <Grid.Column>Heres another thing</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      </Visibility>
      </div>
    )
  }
}

export default Home
