import React, { useState } from 'react'
import Select from 'react-select'

const options = [
    { value: 'שידות', label: 'שידות' },
    { value: 'אקססוריז', label: 'אקססוריז' },
    { value: 'מזנונים', label: 'מזנונים' },
    { value: 'ארונות', label: 'ארונות' },
    { value: 'שולחנות', label: 'שולחנות' },
    { value: 'ריהוט גן', label: 'ריהוט גן' },
    { value: 'לחדר/למטבח', label: 'לחדר/למטבח' },
    { value: 'כיסאות/כורסאות', label: 'כיסאות/כורסאות' },
]
export default function FilterSelcet({ handleChange }) {
    const [selectedOption, setSelectedOption] = useState(null)
    function onSetSelected(ev) {
        console.log(ev)
        const destructuredEv = {
            target: {
                type: 'selector',
                value: ev.map(selector => selector.value),
                name: 'labels'
            }
        }
        handleChange(destructuredEv)
        setSelectedOption(ev)
    }

    return (
        <div className="multi-selector">
            <Select
                defaultValue={selectedOption}
                onChange={onSetSelected}
                options={options}
                isMulti={true}
                placeholder="בחר קטגרויות..."
            />
        </div>
    )
}