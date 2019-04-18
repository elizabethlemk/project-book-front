import React from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

import Slider from "react-slick";
import { connect } from "react-redux";

import { UserCard } from "../components/UserCard";
import { BlogCard } from "../blog-files/BlogCard";
import { ProjectContainer } from "../project-files/ProjectContainer";
import Loaders from "../components/Loaders";

class Browse extends React.Component {
  render() {
    console.log(this.props);
    const { allBlogs, allProjects } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };
    const userSettings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };
    return (
      <Container fluid justify="middle">
        <Header textAlign="center">Blogs</Header>
        {allBlogs.length > 0 ? (
          <Slider {...settings}>
            {allBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </Slider>
        ) : (
          <Loaders />
        )}
        <Header textAlign="center">Projects</Header>
        {allProjects.length > 0 ? (
          <Slider {...userSettings}>
            {allProjects.map(project => (
              <Segment>
                <ProjectContainer key={project.id} project={project} />
              </Segment>
            ))}
          </Slider>
        ) : (
          <Loaders />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProjects: state.userReducer.allProjects,
    allBlogs: state.userReducer.allBlogs
  };
};

export default connect(mapStateToProps)(Browse);
