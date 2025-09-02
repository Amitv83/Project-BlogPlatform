import { Link } from "react-router-dom"
import {formatISO9075} from 'date-fns'

export default function Post({_id, title, summary, cover, createdAt}) {
  return (
    <>
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img
            src={cover}
            alt=""
          />
          </Link>
        </div>

        <div className="text">
          <h2>{title}</h2>

          <p className="info">
            <a className="author">Amit Kumar Vishwakarma</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="summary">
            {summary}
          </p>
        </div>
      </div>
    </>
  );
}
