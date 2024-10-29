const Footer = () => (
    <div className="p-3 bg-gray-700 text-gray-200 text-xs flex flex-col items-start space-y-1 w-full">
        <p className="font-semibold text-lime-200">Keyboard Shortcuts:</p>
        <ul className="list-disc list-inside space-y-1">
            <li className="font-medium text-blue-300"><span className="font-semibold">Arrow Up:</span> Increase password length</li>
            <li className="font-medium text-blue-300"><span className="font-semibold">Arrow Down:</span> Decrease password length</li>
            <li className="font-medium text-blue-300"><span className="font-semibold">N:</span> Toggle include numbers</li>
            <li className="font-medium text-blue-300"><span className="font-semibold">S:</span> Toggle include symbols</li>
            <li className="font-medium text-blue-300"><span className="font-semibold">E:</span> Toggle use keyword</li>
            <li className="font-medium text-blue-300"><span className="font-semibold">Ctrl + C:</span> Copy password to clipboard</li>
            <li className="font-medium text-blue-300"><span className="font-semibold">Enter:</span> Generate new password</li>
        </ul>

        <p className="font-semibold text-lime-200 mt-2">
            Note: If you refresh the password and the keyword feature is enabled, the new password will not include the keyword by default. To update, toggle the keyword back and forth. (We apologize for the inconvenience, and are working to fix this bug).
        </p>

        <code className="block bg-gray-800 text-lime-300 px-2 py-1 rounded-lg font-mono text-sm mt-2">
            Reach out at &quot;<a target="_blank" href="https://github.com/madhavJivani/React/tree/main/pass_gen" className="underline hover:text-lime-400">https://github.com/madhavJivani/React/tree/main/pass_gen</a>&quot; to suggest changes to fix this bug.
        </code>
    </div>
);

export default Footer;
