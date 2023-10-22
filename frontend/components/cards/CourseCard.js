import { Card, Badge } from 'antd';
import Link from 'next/link';
import { Avatar, Tooltip } from 'antd';
import { CurrencyFormatter } from '../../utils/helpers';

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  }; 

  // Define styles for padding and box shadow
  const cardStyle = {
    padding: '10px', // You can adjust the padding as needed
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)', // Adjust the box shadow values
    marginBottom: '20px'
  };

  return (
    <Link href={`/course/${slug}`} style={linkStyle}>
      <Card className="course-container"  style={cardStyle}>
        <div className="row">
          <Avatar size={80} src={course.image ? course.image.Location : '/course.png'} />
          <div className="col">
            <h3 className="font-weight-bold text-primary">{name}</h3>
            <h5> {instructor.name}</h5> 
            <p>{instructor.location}</p>
            {/* <p>{course.description && course.description}</p> */} 
            <p className="description-text">{course.description && course.description.substring(0, 60)}...</p>

          </div>
        </div>
                    {/* <p>{instructor.location}</p> */}
        
        <Badge count={category} style={{ backgroundColor: '#03a9f4' }} className="pb-2 mr-2" />
        <p className="pt-2">Tuition: {paid ? CurrencyFormatter({ amount: price, currency: 'usd' }) : "Free"}</p> 
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}

        <button className="w-100 btn" style={{ borderColor: '#007BFF' }}>
          More details
        </button> 
      </Card> 
    </Link>
  );
};

export default CourseCard;
