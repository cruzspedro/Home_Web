import { useState } from "react";

const FilterCheckbox = ({ label, type }: any) => {

    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className="my-3">
            <label className=''>
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)}/>
                <span className='mx-3 text-white'>{label}</span>
            </label>
            <input type={type ? 'number' : 'text'} className={isChecked ? 'text-black w-15 pl-2' : 'hidden'}/>
        </div>
    );
};

export default FilterCheckbox