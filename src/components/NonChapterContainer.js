import NonChapterField from "./NonChapterField";

function NonChapterContainer(props) {
    return (
        <div>
            {props.nonChapterData.map(data => (
                <NonChapterField key={data.id} id={data.id} nonChapterName={data.nonChapterName} descriptor={data.descriptor} checked={data.checked}/>
            ))}
        </div>
    )
}

export default NonChapterContainer