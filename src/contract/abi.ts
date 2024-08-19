const contractABI = [
	{
	  inputs: [],
	  stateMutability: "nonpayable",
	  type: "constructor",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "newAdmin",
		  type: "address",
		},
	  ],
	  name: "AdminSet",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "bytes32",
		  name: "credentialHash",
		  type: "bytes32",
		},
		{
		  indexed: true,
		  internalType: "address",
		  name: "_studentAddress",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "_credentialType",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "_credentialDetails",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "_credentialDate",
		  type: "uint256",
		},
	  ],
	  name: "CredentialIssued",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "employer",
		  type: "address",
		},
	  ],
	  name: "EmployerSet",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "institution",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "name",
		  type: "string",
		},
	  ],
	  name: "InstitutionSet",
	  type: "event",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_educationAddress",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_studentAddress",
		  type: "address",
		},
		{
		  internalType: "string",
		  name: "_credentialType",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "_credentialDetails",
		  type: "string",
		},
		{
		  internalType: "uint256",
		  name: "_credentialDate",
		  type: "uint256",
		},
		{
		  internalType: "bytes",
		  name: "_signatureInstitution",
		  type: "bytes",
		},
	  ],
	  name: "issueCredential",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "newAdmin",
		  type: "address",
		},
	  ],
	  name: "setAdmin",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_employer",
		  type: "address",
		},
	  ],
	  name: "setEmployer",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_institution",
		  type: "address",
		},
		{
		  internalType: "string",
		  name: "_name",
		  type: "string",
		},
	  ],
	  name: "setInstitution",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_student",
		  type: "address",
		},
		{
		  internalType: "string",
		  name: "_name",
		  type: "string",
		},
		{
		  internalType: "uint64",
		  name: "_cpf",
		  type: "uint64",
		},
	  ],
	  name: "setStudent",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "employer",
		  type: "address",
		},
		{
		  indexed: true,
		  internalType: "address",
		  name: "institution",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "bool",
		  name: "success",
		  type: "bool",
		},
	  ],
	  name: "SignatureVerified",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "student",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "name",
		  type: "string",
		},
	  ],
	  name: "StudentSet",
	  type: "event",
	},
	{
	  inputs: [],
	  name: "admin",
	  outputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  name: "educations",
	  outputs: [
		{
		  internalType: "address",
		  name: "educationAddress",
		  type: "address",
		},
		{
		  internalType: "string",
		  name: "name",
		  type: "string",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  name: "employers",
	  outputs: [
		{
		  internalType: "bool",
		  name: "",
		  type: "bool",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  name: "institutions",
	  outputs: [
		{
		  internalType: "bool",
		  name: "",
		  type: "bool",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_account",
		  type: "address",
		},
	  ],
	  name: "isEmployer",
	  outputs: [
		{
		  internalType: "bool",
		  name: "",
		  type: "bool",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_account",
		  type: "address",
		},
	  ],
	  name: "isInstitution",
	  outputs: [
		{
		  internalType: "bool",
		  name: "",
		  type: "bool",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_account",
		  type: "address",
		},
	  ],
	  name: "isStudent",
	  outputs: [
		{
		  internalType: "bool",
		  name: "",
		  type: "bool",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  name: "studentCredentials",
	  outputs: [
		{
		  internalType: "bytes32",
		  name: "credentialHash",
		  type: "bytes32",
		},
		{
		  internalType: "string",
		  name: "credentialType",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "credentialDetails",
		  type: "string",
		},
		{
		  internalType: "address",
		  name: "educationalInstitutionAddress",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "studentAddress",
		  type: "address",
		},
		{
		  internalType: "uint256",
		  name: "credentialDate",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  name: "students",
	  outputs: [
		{
		  internalType: "bool",
		  name: "",
		  type: "bool",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  name: "studentsInfo",
	  outputs: [
		{
		  internalType: "address",
		  name: "studentAddress",
		  type: "address",
		},
		{
		  internalType: "string",
		  name: "name",
		  type: "string",
		},
		{
		  internalType: "uint64",
		  name: "cpf",
		  type: "uint64",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "_educationAddress",
		  type: "address",
		},
		{
		  internalType: "address",
		  name: "_studentAddress",
		  type: "address",
		},
		{
		  internalType: "string",
		  name: "_credentialType",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "_credentialDetails",
		  type: "string",
		},
		{
		  internalType: "uint256",
		  name: "_credentialDate",
		  type: "uint256",
		},
		{
		  internalType: "bytes",
		  name: "_signatureInstitution",
		  type: "bytes",
		},
		{
		  internalType: "uint8",
		  name: "v",
		  type: "uint8",
		},
		{
		  internalType: "bytes32",
		  name: "r",
		  type: "bytes32",
		},
		{
		  internalType: "bytes32",
		  name: "s",
		  type: "bytes32",
		},
	  ],
	  name: "verifyCredential",
	  outputs: [
		{
		  internalType: "bool",
		  name: "",
		  type: "bool",
		},
	  ],
	  stateMutability: "pure",
	  type: "function",
	},
  ];

export default contractABI;