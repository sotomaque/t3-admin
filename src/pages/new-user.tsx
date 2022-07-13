import { Layout, SingleColumnContentWrapper } from 'components';

const NewUser = () => {
  return (
    <Layout>
      <SingleColumnContentWrapper>
        <div className="bg-gray-100 h-full w-full py-10">
          <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-4">
            <div className="max-w-7xl mx-auto">
              <div className="p-4 bg-white">
                <div>TODO USER FORM</div>
              </div>
            </div>
          </div>
        </div>
      </SingleColumnContentWrapper>
    </Layout>
  );
};

export default NewUser;
