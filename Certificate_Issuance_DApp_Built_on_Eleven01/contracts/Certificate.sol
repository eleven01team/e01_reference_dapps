
pragma solidity ^0.4.24;

contract Certificate {

    address public admin;
    
    constructor() public {
        admin = msg.sender;
        certificateDataCount = 1212121;
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
        string InstituteName,
        string IssuerName,
        string CandidateName,
        string CourseName,
        string Location,
        string DateOfCompletion
    );
    
    CertificateData[] public certificateData;

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
        CertificateData memory _cData = CertificateData(certificateDataCount, msg.sender, InstituteName,IssuerName,CandidateName,CourseName,Location,DateOfCompletion);
        certificateData.push(_cData);
        issueCertificate[msg.sender] = _cData;
        
        emit CertificateEvent(InstituteName,IssuerName,CandidateName,CourseName,Location,DateOfCompletion);
    }
}
