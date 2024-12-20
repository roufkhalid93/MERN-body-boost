import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useState } from "react";
import EditModal from "../components/WorkoutEdit";
import { useAuthContext } from '../hooks/useAuthContext'


//date fns
import formatDistanceToNow from'date-fns/formatDistanceToNow'


const WorkoutDetails = ({workout}) => {
    const { dispatch } = useWorkoutsContext()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {user} = useAuthContext()

    //handle delete
    const handleDelete = async () =>{
        if(!user){
            return
        }

    const response = await fetch('/api/workouts/' + workout._id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })

    const json = await response.json()

    if(response.ok) {
        dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
    }

    //handle update
    const handleUpdate = async (updatedWorkout) => {
        if(!user){
            return
        }
        
    const response = await fetch('/api/workouts/' + workout._id, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
         },
        body: JSON.stringify(updatedWorkout),
    });

    const json = await response.json();

    if (response.ok) {
        console.log('Dispatching UPDATE_WORKOUT with payload:', json);
        dispatch({ type: 'UPDATE_WORKOUT', payload: json });
        setIsModalOpen(false); // Close the modal on success
    }
};

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong> {workout.load}</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <button 
                className="material-symbols-outlined" 
                onClick={() => setIsModalOpen(true)}
                style={{ backgroundColor:'#355E3B', color:'white', borderColor: '#355E3B', marginTop:'10px', marginRight: '5px', width:'40px', height:'30px', fontSize:'1.3rem', borderRadius:'4px'}}
            >
                edit
            </button>
            <button 
            className="material-symbols-outlined" 
            onClick={handleDelete}
            style={{ backgroundColor:'#FF3131', color:'white', borderColor: '#FF3131', width:'40px', height:'30px', fontSize:'1.3rem', borderRadius:'4px'}}>
                delete
            </button>
            

            <EditModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleUpdate} 
                workout={workout} 
            />
        </div>
    )
}

export default WorkoutDetails