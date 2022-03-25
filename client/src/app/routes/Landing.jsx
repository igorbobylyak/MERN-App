import Todo from '../../components/Todo';

function Landing() {
    return (
        <div className="todos-container">
            <Todo title="First" body="This is 1" />
            <Todo title="Third" body="This is 2" />
        </div>
    )
}

export default Landing
