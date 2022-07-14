import { Component } from "react";
import { Link } from "react-router-dom";
import "./courseItem.scss";
class CourseItem extends Component {
  render() {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 ">
        <Link to={`/course/${this.props.course.id}`}>
          <div className="card h-100 shadow-sm bg-body rounded">
            <img
              alt={this.props.course.name}
              className="img-responsive"
              src={this.props.course.image}
            />
            <div className="card-body">
              <h5 className="card-title">{this.props.course.name}</h5>
              <h6 className="card-description">
                {this.props.course.description}
              </h6>
              <h6 className="category">{this.props.category.name}</h6>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default CourseItem;
