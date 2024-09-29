import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-primary text-quadary shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-ternary">Privacy Policy</h1>
      
      <p className="text-gray-700 mb-6">
        We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and store your information during your session on our website/application.
      </p>
      
      <h2 className="text-lg font-semibold text-ternary mb-0 overline">Information We Collect</h2>
      <p className="text-gray-700 mb-7">
        During your session, we may collect certain information, limited to your first and last navigateame. 
      </p>
      
      <h2 className="text-lg font-semibold mb-0 overline text-ternary">Deletion of Information</h2>
      <p className="text-gray-700 mb-7">
        All personal information collected during your session will be permanently deleted after the session ends. We do not store or retain any personal information beyond the session.
      </p>
      
      <h2 className="text-lg overline text-ternary font-semibold">Data Security</h2>
      <p className="text-gray-700 mb-7">
        We implement reasonable security measures to protect your information while it is temporarily stored. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
      </p>
      
      <h2 className="text-lg overline text-ternary font-semibold">Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions or concerns about this Privacy Policy, please contact us at:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>The Big Green Brother</li>
        <li>biggreenbrother@greenbrother.org</li>
        <li>(123) 456-7890</li>
      </ul>

      <p className="text-quadary font-extrabold ">
        By using our services, you consent to the terms of this Privacy Policy.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
