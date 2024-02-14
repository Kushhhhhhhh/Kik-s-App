/* eslint-disable react/prop-types */
const GenderCheckbox = ({ onCheckboxChange, selectGender}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectGender === 'Male' ? 'selected' : ''}`}>
					<span className='label-text'>Male</span>
					<input 
					type='checkbox' 
					className='checkbox border-slate-900' 
					checked={selectGender === 'Male'}
					onChange={() => onCheckboxChange('Male')} />
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectGender === 'Female' ? 'selected' : ''}`}>
					<span className='label-text'>Female</span>
					<input 
					type='checkbox' 
					className='checkbox border-slate-900'
					checked={selectGender === 'Female'}
					onChange={() => onCheckboxChange('Female')}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;