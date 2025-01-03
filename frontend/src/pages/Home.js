import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'



const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    // useEffect(() => {
    //     const fetchWorkouts = async () => {
    //         const response = await fetch('/api/workouts', {
    //             headers: {
    //                 'Authorization': `Bearer ${user.token}`
    //             }
    //         })
    //         const json = await response.json()

    //         if(response.ok){
    //             dispatch({type: 'SET_WORKOUTS', payload: json})
    //         }
    //     }

    //     if (user) {
    //         fetchWorkouts()
    //     }
        
    // }, [dispatch, user])

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                // Dynamically choose the API route based on isAdmin
                const endpoint = user.isAdmin 
                    ? '/api/workouts/admin/all' 
                    : '/api/workouts';

                const response = await fetch(endpoint, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_WORKOUTS', payload: json });
                } else {
                    console.error('Failed to fetch workouts:', json.error);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className='workouts'>
                {workouts && workouts.map((workout) =>(
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            {/* <WorkoutForm /> */}
            {user && !user.isAdmin && <WorkoutForm />} 
            {/* Hide WorkoutForm for Admin */}
        </div>
    )
}

export default Home