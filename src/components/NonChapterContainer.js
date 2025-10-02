import NonChapterField from "./NonChapterField";

function NonChapterContainer(props) {
    return (
        <div>
            {props.nonChapterData.map(data => (
                <NonChapterField key={data.id} id={data.id} fileName={data.fileName}/>
            ))}
        </div>
    )
}

export default NonChapterContainer