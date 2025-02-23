import Legend from "./Legend";

const RenderedLegends = ({ legendsArray }) => {
    return legendsArray.map((legend) => (
        <Legend key={legend?.attributes?.id} legend={legend} />
    ))
}

export default RenderedLegends;