import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { createProfile, getCurrentProfile } from '../../actions/profile'; 

const initialState = {
    company: '',
    location: '',
    phone: '',
    address: '',
    email: '',
    product: '',
    productcat: '',
    twitter: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: ''
    };

const EditProfile = ({ 
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
     history
}) => {
    
    const [formData, setFormData] = useState(initialState);

    const [displaySocialInputs, toggleSocialInputs] = useState(false); 

    useEffect(() => {
        if (!profile) getCurrentProfile();
        if (!loading) {
          const profileData = { ...initialState };
          for (const key in profile) {
            if (key in profileData) profileData[key] = profile[key];
          }
          setFormData(profileData);
        }
      }, [loading, getCurrentProfile, profile]);
    
    const {
        company,
        location,
        phone,
        address,
        email,
        product,
        productcat,
        twitter,
        facebook,
        youtube,
        linkedin,
        instagram
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData,history, true);
    };       
    return (
        <Fragment>
			<h1 className='large text-primary'>Edit Your Profile</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Add some changes to your profile
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
                    <select name='productcat' value={productcat} 
                    onChange={onChange}>
						<option value='0'>* Select your Craft Categeory</option>
						<option value='Copper Craft'>Copper Craft</option>
						<option value='Block Printing'>Block Printing</option>
						<option value='Thread Work'>Thread Work</option>
						<option value='Murals'>Murals</option>
						<option value='Aipan'>Aipan</option>
						<option value='Musical Instrument'>Musical Instrument</option>
						<option value='Bamboo'>Bamboo</option>
						<option value='Tharu Tribal Craft'>Tharu Tribal Craft</option>
					</select>
					<small className='form-text'>
						Give us an idea of your main occupation 
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Company'
						name='company'
						value={company}
						onChange={onChange}
					/>
					<small className='form-text'>
						Could be your own company or one you work for
					</small>
				</div>
				
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={onChange}
					/>
					<small className='form-text'>
						City & state suggested (eg. Bashti,Rudarprayag,Uttarakhand)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Phone Number'
						name='phone'
						value={phone}
						onChange={onChange}
					/>
					<small className='form-text'>
						Phone suggested (eg. 10 digits phone no)
					</small>
				</div>
                <div className='form-group'>
					<input
						type='text'
						placeholder='Address'
						name='address'
						value={address}
						onChange={onChange}
					/>
				</div>
                <div className='form-group'>
					<input
						type='email'
						placeholder='Email'
						name='email'
						value={email}
						onChange={onChange}
					/>
				</div>
                <div className='form-group'>
					<input
						type='product'
						placeholder='Product'
						name='product'
						value={product}
						onChange={onChange}
					/>
                 <small className="form-text">
                    Please use comma separated values (eg.murals,craft etc. )
                </small>
				</div>
                <div className='my-2'>
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type='button'
						className='btn btn-light'
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
                {displaySocialInputs && (
			    <Fragment>
                <div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x' />
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x' />
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x' />
							<input
								type='text'
								placeholder='YouTube URL'
								name='youtube'
								value={youtube}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x' />
							<input
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								value={linkedin}
						    	onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x' />
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={onChange}
							/>
						</div>
                 </Fragment>       
                )}
            <input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to="/dashboard">
                Go Back
            </Link> 
			</form>
        </Fragment>  
    );
};
                      
EditProfile.propTypes = {
    createProfile : PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));