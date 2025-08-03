function ReplacementField(props) {
    return (
        <div>
            <label htmlFor={'replaceBefore' + props.id}>Before:</label>
            <input id={'replaceBefore' + props.id} type="text" defaultValue={props.before}></input>
            <label htmlFor={'replaceAfter' + props.id}>After:</label>
            <input id={'replaceAfter' + props.id} type="text" defaultValue={props.after}></input>
        </div>

    )
}

export default ReplacementField