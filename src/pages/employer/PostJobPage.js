/* eslint-disable */
import React, {useEffect, useState} from "react";
import BaseLayout from "../../components/BaseLayout";
import AxiosConfig from "../../AxiosConfig";
// import Select2 from "react-select2-wrapper";

const PostJobPage = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        AxiosConfig.get('jobs/')
            .then(res => {
                setTags(res.data);
                console.log(tags);
            })
    }, []);

    return (
        <BaseLayout title={'Post new job'}>

            <div className="page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner-header">
                                <h3>Post A Job</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-12 col-xs-12">
                            <div className="post-job box">
                                <h3 className="job-title">Post a new Job</h3>
                                <form className="form-ad">
                                    <div className="form-group">
                                        <label className="control-label">Job Title</label>
                                        <input type="text" className="form-control" placeholder="Write job title"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Job Title</label>
                                        <textarea className="form-control" placeholder="Write job description" rows={4}/>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Salary</label>
                                                <input type="text" className="form-control" placeholder="Write job title"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Required skills</label>
                                                {/*<Select2*/}
                                                {/*    multiple*/}
                                                {/*    data={['bug', 'feature', 'documents', 'discussion']}*/}
                                                {/*    options={*/}
                                                {/*        {*/}
                                                {/*            placeholder: 'search by tags',*/}
                                                {/*        }*/}
                                                {/*    }*/}
                                                {/*/>*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Company</label>
                                        <input type="text" className="form-control" placeholder="Write company name"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Location <span>(optional)</span></label>
                                        <input type="text" className="form-control" placeholder="e.g.London"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Category</label>
                                        <div className="search-category-container">
                                            <label className="styled-select">
                                                <select className="dropdown-product selectpicker">
                                                    <option>All Categories</option>
                                                    <option>Finance</option>
                                                    <option>IT & Engineering</option>
                                                    <option>Education/Training</option>
                                                    <option>Art/Design</option>
                                                    <option>Sale/Markting</option>
                                                    <option>Healthcare</option>
                                                    <option>Science</option>
                                                    <option>Food Services</option>
                                                </select>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Job Tags <span>(optional)</span></label>
                                        <input type="text" className="form-control" placeholder="e.g.PHP,Social Media,Management"/>
                                        <p className="note">Comma separate tags, such as required skills or technologies, for this job.</p>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Description</label>
                                    </div>
                                    <section id="editor">
                                        <div id="summernote"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem quia aut modi fugit, ratione saepe perferendis odio optio repellat dolorum voluptas excepturi possimus similique veritatis nobis. Provident cupiditate delectus, optio?</p></div>
                                    </section>
                                    <div className="form-group">
                                        <label className="control-label">Application email / URL</label>
                                        <input type="text" className="form-control" placeholder="Enter an email address or website URL"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Closing Date <span>(optional)</span></label>
                                        <input type="text" className="form-control" placeholder="yyyy-mm-dd"/>
                                    </div>
                                    <div className="divider">
                                        <h3 className="job-title">Company Details</h3>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Company Name</label>
                                        <input type="text" className="form-control" placeholder="Enter the name of the company"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Website <span>(optional)</span></label>
                                        <input type="text" className="form-control" placeholder="http://"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Tagline <span>(optional)</span></label>
                                        <input type="text" className="form-control" placeholder="Briefly describe your company"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Tagline <span>(optional)</span></label>
                                        <input type="text" className="form-control" placeholder="Briefly describe your company"/>
                                    </div>
                                    <div className="custom-file mb-3">
                                        <input type="file" className="custom-file-input" id="validatedCustomFile" required/>
                                        <label className="custom-file-label form-control" htmlFor="validatedCustomFile">Choose file...</label>
                                        <div className="invalid-feedback">Example invalid custom file feedback</div>
                                    </div>
                                    <a href="#" className="btn btn-common">Submit your job</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
}

export default PostJobPage;