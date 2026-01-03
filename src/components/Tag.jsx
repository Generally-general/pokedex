import './Tag.css';

const Tag = ({ type }) => {
  return (
      <div className={`${type} pokemon-type`}>
        {type}
      </div>
  )
}

export default Tag