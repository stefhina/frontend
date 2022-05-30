import http, { transformResponse } from '../utils/http';

// Not related to BaaP custom forms
const onChange = (e, setter, resetError) => {
  if (resetError) {
    resetError('');
  }

  setter(e.target.value);
};

const getForm = async (projectId, formId) => {
  try {
    const { data } = await http.get(`/projects/${projectId}/forms/${formId}`);

    return data;
  } catch (_) {
    return;
  }
};

const getForms = async (projectId) => {
  try {
    const { data } = await http.get(`/projects/${projectId}/forms`);

    return data;
  } catch (_) {
    return;
  }
};

const validateForm = async (projectId, name, description, setResult) => {
  try {
    const { data } = await http.post(`/projects/${projectId}/forms/new`, {
      name,
      description,
      test: true,
    });

    return data.validated;
  } catch ({ response }) {
    const error = transformResponse(response.data.reason);

    setResult(error);

    return false;
  }
};

const createForm = async (projectId, name, description, fields, setResult) => {
  try {
    const { data } = await http.post(`/projects/${projectId}/forms/new`, {
      name,
      description,
      fields,
    });

    setResult(true, 'Form created succesfully.');

    return data;
  } catch ({ response }) {
    if (response.data.reason.indexOf("'fields'") === 0) {
      setResult(false, 'Fields cannot be empty.');
    } else {
      setResult(false, 'Failed to create form, please try again.');
    }

    return;
  }
};

const updateForm = async (projectId, formId, data, setResult) => {
  const { name, description, fields } = data;

  try {
    const { data } = await http.put(`/projects/${projectId}/forms/${formId}`, {
      name,
      description,
      fields,
    });

    if (fields) {
      setResult(true, 'Form updated succesfully.');
    }

    return data;
  } catch ({ response }) {
    if (fields) {
      if (response.data.reason.indexOf("'fields'") === 0) {
        setResult(false, 'Fields cannot be empty.');
      } else {
        setResult(false, 'Failed to update form, please try again.');
      }
    } else {
      const error = transformResponse(response.data.reason);

      setResult(error);
    }

    return;
  }
};

const deleteForm = async (projectId, formId) => {
  try {
    const { data } = await http.delete(
      `/projects/${projectId}/forms/${formId}`
    );

    return data;
  } catch (_) {
    return;
  }
};

export {
  onChange,
  getForm,
  getForms,
  validateForm,
  createForm,
  updateForm,
  deleteForm,
};
