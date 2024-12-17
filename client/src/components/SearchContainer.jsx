import React from "react";
import { Form, Link, useSubmit } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { jobStatusArray, jobTypeArray, sortArray } from "../utils/constants";
import customFetch from "../utils/customFetch";
import { useAllJobsContext } from "../pages/AllJobs";

function SearchContainer() {

  const { searchValues } = useAllJobsContext();
  const { search, jobType, jobStatus, sort } = searchValues;
  const submit = useSubmit();
 
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <section>
      <Form>
        <h4 className='font-medium'>search jobs</h4>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 mb-10'>
          <FormRow
            name='search'
            type='search'
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            data={["all", ...jobStatusArray]}
            labelText='Job status'
            name='jobStatus'
            defaultValue={jobStatus}
            onChange={(e) => {
              return submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            data={["all", ...jobTypeArray]}
            labelText='Job type'
            name='jobType'
            defaultValue={jobType}
            onChange={(e) => {
              return submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            data={sortArray}
            labelText='Sort'
            name='sort'
            defaultValue={sort}
            onChange={(e) => {
              return submit(e.currentTarget.form);
            }}
          />
        </div>
        <Link to='/dashboard/all-jobs' className='form-btn'>
          Reset values
        </Link>
      </Form>
    </section>
  );
}

export default SearchContainer;
