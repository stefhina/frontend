import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getForm } from '../../hooks/useForm';
import CTA from '../CTA/CTA';
import ArchiveProjectModal from '../Modals/ArchiveProjectModal';
import CreateFormModal from '../Modals/FormModal';
import DeleteProjectModal from '../Modals/DeleteProjectModal';
import EditProjectModal from '../Modals/EditProjectModal';
import PageTitle from '../Typography/PageTitle';
import PageButton from '../Typography/PageButton';
import SectionTitle from '../Typography/SectionTitle';
import SectionButton from '../Typography/SectionButton';

const ManageForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateFormModal, setShowCreateFormModal] = useState(false);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const { projectId, formId } = useParams();
  const toggleEditModal = (e) => setShowEditModal(!showEditModal);
  const toggleArchiveModal = (e) => setShowArchiveModal(!showArchiveModal);
  const toggleDeleteModal = (e) => setShowDeleteModal(!showDeleteModal);

  useEffect(async () => {
    const form = await getForm(projectId, formId);

    if (form) {
      setName(form.name);
      setDescription(form.description);

      // setRecords(await getRecords(projectId, formId));
    } else {
      navigate('/404');
    }
  }, []);

  return (
    <>
      <div>
        <PageTitle>{name}</PageTitle>
        {name ? (
          <>
            <PageButton
              style="error"
              label="Delete"
              onClick={toggleDeleteModal}
            />
            <PageButton
              style="warning"
              label="Archive"
              onClick={toggleArchiveModal}
            />
            <PageButton
              style="primary"
              label="Edit"
              onClick={toggleEditModal}
            />
            <EditProjectModal
              name={name}
              description={description}
              show={showEditModal}
              onHide={toggleEditModal}
              setName={setName}
              setDescription={setDescription}
            />
            <ArchiveProjectModal
              show={showArchiveModal}
              onHide={toggleArchiveModal}
            />
            <DeleteProjectModal
              id={projectId}
              show={showDeleteModal}
              onHide={toggleDeleteModal}
            />
          </>
        ) : null}
      </div>

      <CTA />

      {/* <div>
        <SectionTitle>Forms</SectionTitle>
        <SectionButton
          style="primary"
          label="Create form"
          link={true}
          to="records/new"
        />
      </div> */}

      {/* {records.length ? <FormsTable records={records} /> : null} */}
    </>
  );
};

export default ManageForm;