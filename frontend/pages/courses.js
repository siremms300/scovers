import { useRouter } from 'next/router';
import Header from '../components/Header.js';
import HowItWorks from '../components/HowItWorks.js';
import CourseCard from '../components/cards/CourseCard.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Courses = ({ courses }) => {
    const router = useRouter();
    const { destination } = router.query;

    // Filter courses based on various fields
    const filteredCourses = courses.filter((course) => {
        const searchQuery = destination.toLowerCase();

        // Check if the name, instructor name, instructor location, or category contains the search query
        return (
            (course.name && course.name.toLowerCase().includes(searchQuery)) ||
            (course.instructor && course.instructor.name && course.instructor.name.toLowerCase().includes(searchQuery)) ||
            (course.instructor && course.instructor.location && course.instructor.location.toLowerCase().includes(searchQuery)) ||
            (course.category && course.category.toLowerCase().includes(searchQuery))
        );
    });

    useEffect(() => {
        if (filteredCourses.length === 0) {
            // Show a toast message if no courses are found
            toast.error('No courses found. Redirecting to the home page...', {
                position: 'top-center',
                autoClose: 3000, // Auto close the toast after 3 seconds
                onClose: () => {
                    router.push('/'); // Redirect to the home page
                },
            });
        }
    }, [filteredCourses, router]);

    return (
        <>
            <Header />
            <hr />

            {/* <HowItWorks /> */}

            {/* <div className='row col-md-6 offset-md-3 text-center'>
                <h1 className='pt-5 fw-bold'>
                    Find the right course for you and enroll
                </h1>

            </div> */}

            
            <div className='container-fluid'>
                <div className='row'>
                    {filteredCourses.map((course) => (
                        <div key={course._id} className='col-md-4'>
                            <CourseCard course={course} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/courses`);

    return {
        props: {
            courses: data,
        },
    };
}

export default Courses;
