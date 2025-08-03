import ReplacementField from './ReplacementField'

function ReplacementContainer(props) {
    return (
        <div>
            {props.replacementData.map(data => (
                <ReplacementField key={data.id} id={data.id} before={data.before} after={data.after} />
            ))}
        </div>
    )
}

export default ReplacementContainer