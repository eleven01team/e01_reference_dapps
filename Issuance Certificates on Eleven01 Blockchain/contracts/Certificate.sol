pragma solidity ^0.4.24;

contract Certificate {

    address public admin;
    
    uint ID = 11010000001101; 
    
    constructor() public {
        admin = msg.sender;
        
    }

    struct CertificateData {
        uint Id;
        address Issuer;
        string InstituteName;
        string IssuerName;
        string CandidateName;
        string CourseName;
        string Location;
        string DateOfCompletion;
    }
    
    event CertificateEvent(
        uint Id,
        string InstituteName,
        string IssuerName,
        string CandidateName,
        string CourseName,
        string Location,
        string DateOfCompletion
    );
    
    mapping(uint => CertificateData) public certificateData;
    
    uint public certificateDataCount;

    mapping(address => CertificateData) issueCertificate;
    
    function certificateIssue(
        string memory InstituteName,
        string memory IssuerName,
        string memory CandidateName,
        string memory CourseName,
        string memory Location,
        string memory DateOfCompletion) public {
        certificateDataCount += 1;
        uint Id = ID ++;
        certificateData[Id] = CertificateData(Id, msg.sender, InstituteName,IssuerName,CandidateName,CourseName,Location,DateOfCompletion);
        issueCertificate[msg.sender] = certificateData[Id];
        
        emit CertificateEvent(Id, InstituteName,IssuerName,CandidateName,CourseName,Location,DateOfCompletion);
    }
}


