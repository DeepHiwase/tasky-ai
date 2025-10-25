/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Inbox Page for the app
 */

// Components
import Head from "@/components/Head";
import TopAppBar from "@/components/TopAppBar";

const InboxPage = () => {
  return (
    <>
      <Head title="Inbox - Tasky AI" />

      <TopAppBar
        title="Inbox"
        taskCount={20}
      />
    </>
  );
};

export default InboxPage;
