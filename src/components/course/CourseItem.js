import { Component } from "react";
import { Link } from "react-router-dom";
import "./courseItem.scss";
class CourseItem extends Component {
  render() {
    return (
      <Link to={`/course/${this.props.course.id}`}>
        <div className="card h-100 shadow-sm bg-body rounded">
          <img
            alt={this.props.course.name}
            className="img-responsive"
            src={this.props.course.image}
          />
          <div className="card-body">
            <h5 className="card-title">{this.props.course.name}</h5>
            {this.props.showAchievements ? (
              <>
                <div className="progress mb-3">
                  <div
                    className={"progress-bar progress-bar-striped"}
                    role="progressbar"
                    aria-valuenow={this.props.course.achievement * 10}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      background: "#752ad1",
                      opacity: "1",
                      width: `${this.props.course.achievement * 10}%`,
                    }}
                  ></div>
                </div>
              </>
            ) : (
              <h6 className="card-description">
                {this.props.course.description}
              </h6>
            )}
            {this.props.showAchievements ? (
              <div className="row">
                <div className="col-6">
                  <h6>{this.props.course.achievement}/10</h6>
                </div>
                <div className="col-6">
                  <h6 className="category">{this.props.category.name}</h6>
                </div>
              </div>
            ) : (
              <h6 className="category">{this.props.category.name}</h6>
            )}
          </div>
        </div>
      </Link>
    );
  }
}

export default CourseItem;
