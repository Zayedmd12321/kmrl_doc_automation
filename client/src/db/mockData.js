export const documents = [
  {
    "_id": "940516fd-c1ce-4aeb-8b07-00e6e9ddf7ca",
    "fileName": "analyse.pdf",
    "fileType": "application/pdf",
    "fileSize": 43420,
    "storageKey": "uploads/2025/9/summary.pdf",
    "status": "completed",
    "analysis": {
      "generalSummary": "This report for the Rolling Stock Division for August 2025 details high fleet availability of 98.7%, the completion of all quarterly preventive maintenance, and the full implementation of a new safety protocol. Key issues include a critical delay in the supply of essential IGBT modules, which has reduced spare parts inventory to below safety levels, and a recurring door sensor failure on Trainset RS-11 that prompted a Root Cause Analysis. The report also outlines progress on the depot expansion project and initiates a new IoT-based predictive maintenance pilot, for which recruitment of two specialized technicians has been requested from HR.",
      "urgency": "High, because the critical shortage of IGBT modules is below the mandated safety stock level, posing an immediate risk of extended trainset downtime and impacting service availability.",
      "actionItems": [
        "Finalize the Root Cause Analysis (RCA) report for the RS-11 door sensor and submit the design modification proposal to the Safety Department.",
        "Expedite the delivery of delayed IGBT modules or explore alternative emergency sourcing options.",
        "Provide a decision on invoking the penalty clause for the delayed IGBT module purchase order.",
        "Initiate and fast-track the recruitment process for two Senior Technicians for the IoT project.",
        "Approve the budget allocation for the IoT-based Predictive Maintenance pilot project.",
        "Review and incorporate feedback on the Aluva Depot expansion drawings."
      ],
      "keyDates": [
        {
          "date": "2025-08-05",
          "event": "CMRS issued Safety Circular CMRS/SC/2025/08-A."
        },
        {
          "date": "2025-08-10",
          "event": "Scheduled delivery date for IGBT modules, which was missed."
        },
        {
          "date": "2025-08-15",
          "event": "Door sensor failure on Trainset RS-11 caused an operational delay."
        },
        {
          "date": "2025-09-25",
          "event": "Deadline to expedite the delivery of IGBT modules."
        },
        {
          "date": "2025-09-30",
          "event": "Deadline for Finance to provide an opinion on the penalty clause for the delayed PO."
        },
        {
          "date": "2025-10-10",
          "event": "Deadline to approve the budget for the IoT pilot project."
        },
        {
          "date": "2025-10-15",
          "event": "Deadline to finalize the RCA report for the RS-11 door sensor."
        },
        {
          "date": "2025-10-20",
          "event": "Deadline to review and incorporate feedback on depot expansion drawings."
        },
        {
          "date": "2025-11-15",
          "event": "Deadline to initiate recruitment for two Senior Technicians."
        }
      ],
      "departments": [
        "Engineering",
        "Operations",
        "Procurement",
        "Safety",
        "HR",
        "Finance"
      ],
      "summaries": {
        "Engineering": "Here is a summary of the document from the perspective of the Engineering department.\n\n### **Key Issues & Investigations**\n\n*   **Recurring Door Sensor Fault (Trainset RS-11):**\n    *   **Problem:** A recurring door sensor fault caused an 18-hour downtime and a 7-minute operational delay. This is the third incident in four months.\n    *   **Suspected Cause:** A systemic issue, likely excessive vibration from the track on the Aluva-Pettah corridor combined with premature wear on the wiring harness.\n    *   **Action:** A Root Cause Analysis (RCA) is underway.\n\n*   **Critical Spares Shortage (IGBT Modules):**\n    *   **Problem:** The delivery of IGBT modules (PO-KMRL/RS/2024/112) is critically delayed.\n    *   **Impact:** Stock is down to two units, below the safety minimum of five. A traction converter failure will now lead to extended trainset downtime.\n\n### **Required Actions & Dependencies**\n\n*   **For Our Team (Rolling Stock Engineering):**\n    1.  **Finalize RS-11 RCA:** Conduct vibration analysis on the door panel, collaborate with the P-Way team on track data, and inspect wiring harnesses on similar trainsets (RS-09 to RS-14).\n    2.  **Design Modification:** Draft and submit a proposal for a modified sensor mounting bracket with enhanced vibration damping.\n    3.  **Depot Expansion:** Follow up with the Civil Engineering department on the feedback provided for the new wash plant drawings (AD-E/CIV/004 Rev 2).\n\n*   **Dependencies on Other Departments:**\n    1.  **Procurement:** Urgently provide a definitive delivery date for the IGBT modules or find an alternative source.\n    2.  **Human Resources:** Fast-track the recruitment of two Senior Technicians (Data Systems) needed for the upcoming IoT project.\n\n### **Project & Process Updates**\n\n*   **IoT Predictive Maintenance Project:** The pilot project to install vibration and temperature sensors on traction motors for two trainsets (RS-21, RS-22) has been approved.\n*   **New Safety Protocol Implemented:** A new mandatory diagnostic check on the electro-pneumatic brake control system (Safety Circular CMRS/SC/2025/08-A) has been successfully integrated into our Maximo checklists and all technicians have been trained.\n*   **Preventive Maintenance Note:** During routine brake servicing, Trainset RS-06 showed 5% higher-than-average brake pad wear. This should be monitored.",
        "Operations": "Here is a summary of the document from the perspective of the Operations department.\n\n### **Operations Department Summary: August 2025**\n\nThis summary highlights key issues affecting fleet availability, operational delays, and risks.\n\n**Overall Performance**\n*   **Fleet Availability: 98.7%** (Target: 99.2%)\n*   The target was missed due to 18 hours of downtime on Trainset RS-11.\n\n**Key Operational Issues & Risks**\n\n*   **Recurring Door Fault (RS-11):** A door sensor failure on RS-11 caused a **7-minute operational delay** at JLN Stadium station.\n    *   **Action:** This is being treated as a systemic issue, potentially related to track vibration. A Root Cause Analysis is underway with the P-Way engineering team to find a permanent solution.\n*   **CRITICAL SPARES SHORTAGE:** Our stock of IGBT modules (for traction converters) is critically low at 2 units (safety level is 5).\n    *   **Action:** A failure of this part would cause extended train downtime. **Follow up urgently with Procurement** on the delayed delivery (PO-KMRL/RS/2024/112).\n\n**Maintenance & Safety Compliance**\n\n*   **Proactive Maintenance:** All scheduled quarterly preventive maintenance was successfully completed, ensuring fleet health.\n*   **Safety Mandate Implemented:** A new, mandatory brake system diagnostic check (CMRS/SC/2025/08-A) has been fully implemented across all maintenance shifts and is at 100% compliance.\n*   **Item to Watch:** Brake pads on Trainset RS-06 are showing slightly higher-than-average wear and will be monitored.\n\n**Future Preparedness**\n\n*   **Predictive Maintenance Project:** A pilot project using IoT sensors to predict failures on two trainsets has been approved. This will improve future fleet reliability.\n*   **New Staffing:** Recruitment is in progress for two specialized technicians required for the new IoT project.",
        "Procurement": "Here is a summary of the document from the perspective of the Procurement department.\n\n### **Urgent Action Required**\n\n*   **Expedite Delayed Purchase Order:**\n    *   **PO:** PO-KMRL/RS/2024/112 (Vendor: Apex Electronics)\n    *   **Item:** Insulated Gate Bipolar Transistors (IGBT) modules (Part No. V-MOD-7B4)\n    *   **Issue:** The delivery is critically delayed (due August 10). Stock levels are now below the mandated safety minimum, creating a risk of extended train downtime.\n    *   **Action:** Provide an urgent, definitive delivery timeline or begin exploring alternative emergency sourcing options.\n\n*   **Support Contractual Action:**\n    *   **PO:** PO-KMRL/RS/2024/112\n    *   **Issue:** The Rolling Stock division is discussing invoking the penalty clause for the delayed delivery with the Finance department.\n    *   **Action:** Provide an opinion and support Finance in the process of invoking the penalty clause as per the PO terms.\n\n### **Upcoming Procurement Activities**\n\n*   **New Sourcing for IoT Project:**\n    *   A pilot project for predictive maintenance has been approved.\n    *   **Action:** Prepare for a vendor selection process to source new vibration and temperature sensor hardware for two trainsets.\n\n*   **Future Requirement for Depot Expansion:**\n    *   Phase 2 of the Aluva Depot expansion is moving forward.\n    *   **Action:** Be aware that a procurement process for a new automated train wash plant will be required in the future.",
        "Safety": "Here is a summary of the document from the perspective of the Safety Department.\n\n### **Safety Summary: August 2025 Report**\n\n**1. Critical Incidents & Risks**\n\n*   **Recurring Door Failure (Trainset RS-11):** A door failed to close during operation, marking the third such incident in four months. This represents a significant and recurring safety risk.\n    *   **Root Cause:** Initial analysis suggests a systemic issue, possibly excessive vibration from track misalignment and premature wiring wear, not just a simple component failure.\n    *   **Action:** An RCA is in progress. A fleet-wide inspection of wiring on similar trainsets (RS-09 to RS-14) is required to assess the scale of the risk.\n\n*   **Critical Spares Shortage (IGBT Modules):** Stock for IGBT modules, a key component for the traction system, is below the mandated safety level (2 units instead of 5).\n    *   **Risk:** Failure of a traction converter could lead to extended trainset downtime, impacting service and potentially creating unsafe operational conditions.\n\n*   **Accelerated Brake Pad Wear (Trainset RS-06):** Brake pads on this trainset showed wear 5% above the average during preventive maintenance. This requires monitoring to prevent potential brake performance degradation.\n\n**2. Required Safety Department Actions**\n\n*   **Review & Approve Design Modification:** A proposal for a modified door sensor mounting bracket with vibration damping will be submitted for your review and approval. This is the proposed fix for the recurring door failure on RS-11. (Target: Oct 15, 2025)\n\n**3. Compliance Status**\n\n*   **Brake Safety Directive Implemented:** The new mandatory diagnostic check on the brake control system (per Safety Circular CMRS/SC/2025/08-A) has been fully implemented. All technicians have been trained, and compliance is at 100%.",
        "HR": "Here is a summary of the document from the perspective of the HR department.\n\n### HR Summary: Rolling Stock Division Report (August 2025)\n\n**Recruitment Action Required**\n\n*   **Action:** Initiate and fast-track the recruitment for **two (2) Senior Technicians - Data Systems**.\n*   **Reason:** This is a formal request to support a new, approved IoT-based predictive maintenance project.\n*   **Required Skills:** The roles require expertise in data analysis and sensor technology.\n*   **Deadline:** The target date for completing the recruitment is **November 15, 2025**.\n\n**Training & Compliance Update**\n\n*   **Completed Training:** All 45 maintenance technicians have successfully completed a mandatory 2-hour training session on a new brake system safety protocol (Safety Circular CMRS/SC/2025/08-A).\n*   **Status:** Compliance is at 100%. No further action is needed from HR regarding this training initiative.",
        "Finance": "Here is a summary of the document from the perspective of the Finance department, highlighting relevant, actionable points.\n\n### **Summary for Finance Department: August 2025 Report**\n\nThis summary outlines key financial items, required approvals, and risks from the Rolling Stock Division's August report.\n\n**1. Action Required: Approvals & Decisions**\n\n*   **Depot Expansion Budget:** A budget proposal for the Aluva Depot Expansion (Phase 2) has been submitted and requires review and approval.\n*   **IoT Project Funding:** A request to approve the budget allocation for the IoT-based Predictive Maintenance pilot project is pending. (Due: Oct 10, 2025)\n*   **Vendor Penalty Clause:** Finance must provide an opinion on invoking the penalty clause against the vendor 'Apex Electronics' for a critical delayed delivery (PO-KMRL/RS/2024/112). (Due: Sep 30, 2025)\n\n**2. Procurement Risks & Potential Unbudgeted Costs**\n\n*   **Critical Spares Shortage:** The delay in receiving IGBT modules has reduced safety stock to a critical level. A train failure would lead to significant downtime and potential revenue loss.\n*   **Emergency Sourcing:** Alternative emergency sourcing for these parts may be required, likely at a higher cost than budgeted.\n\n**3. Future Budgetary Impacts**\n\n*   **New Headcount:** A request has been made to hire two Senior Technicians. This will increase future payroll and related overhead costs.\n*   **Corrective Project Costs:** A recurring door sensor fault (Trainset RS-11) is being investigated. The recommended solution will likely require a future funding request for a fleet-wide modification.\n\n**4. Operational Note**\n\n*   Fleet availability was slightly below target (98.7% vs. 99.2%) due to unscheduled maintenance. This highlights a direct link between equipment reliability and potential operational revenue."
      }
    },
    "fullText": "1.0 EXECUTIVE SUMMARY \nThis report details the maintenance activities, incident analyses, and special project updates \nfor the Rolling Stock Division for the month of August 2025. Overall fleet availability \nremained high at 98.7%, slightly below the target of 99.2% due to an unscheduled corrective \nmaintenance on Trainset RS-11. Key activities included the successful completion of the \nquarterly preventive maintenance (PM) schedule for 12 trainsets and the initiation of a Root \nCause Analysis (RCA) for a recurring door sensor malfunction. \nSignificant inter-departmental coordination was required with the Procurement Department to \naddress a critical delay in the supply of IGBT modules (PO-KMRL/RS/2024/112), impacting \nour spares inventory. A formal request has been forwarded to the HR Department for the \nrecruitment of two specialized technicians to support the upcoming IoT sensor integration \nproject. Furthermore, a new safety protocol concerning brake system diagnostics, mandated \nby Safety Circular CMRS/SC/2025/08-A, has been fully implemented across all maintenance \nshifts. A budget proposal for the next phase of the depot expansion has been submitted to the \nFinance Department for approval. The following sections provide a detailed breakdown of \nthese items. \n \n2.0 DETAILED MAINTENANCE ACTIVITIES \nThe division executed both scheduled and unscheduled maintenance tasks to ensure the \noperational health of the Alstom Metropolis fleet. \n2.1 Preventive Maintenance (PM) \nAll quarterly PM schedules (Schedule-B) were completed as planned. The focus was on \nHVAC systems, brake calipers, and passenger information systems (PIS). \n Activity: Schedule-B PM (HVAC System Overhaul) Trainsets Covered: RS-02, RS-\n05, RS-08 Total Man-hours: 150 Status: Completed Remarks: All filters replaced; \ncoolant levels topped up. \n Activity: Schedule-B PM (Brake Caliper Servicing) Trainsets Covered: RS-03, RS-\n06, RS-09 Total Man-hours: 120 Status: Completed Remarks: Wear on pads for RS-\n06 was 5% above average. \n Activity: Schedule-B PM (PIS & Annunciator Check) Trainsets Covered: RS-04, RS-\n07, RS-10 Total Man-hours: 90 Status: Completed Remarks: Minor software patch \napplied to RS-04. \n Activity: Traction Motor Bearing Lubrication Trainsets Covered: RS-12, RS-14, RS-\n15 Total Man-hours: 85 Status: Completed Remarks: No anomalies detected via \nvibration analysis. \n2.2 Corrective Maintenance (CM) \nUnscheduled maintenance was primarily driven by a recurring issue on Trainset RS-11 and a \nminor fault on RS-18. \n\n Trainset RS-11 (Recurring Door Sensor Fault): Incident: On August 15, 2025, the C2-\nCar door failed to close at the JLN Stadium station, causing a 7-minute operational \ndelay. This is the third such incident in four months. Action Taken: The sensor was \nreplaced as an immediate measure. The trainset was returned to service after 18 hours \nof downtime. Follow-up: A full Root Cause Analysis (RCA) has been initiated. See \nSection 3.0 for details. \n Trainset RS-18 (Auxiliary Converter Unit Fault): Incident: A fault alarm was \nregistered in the Train Control & Management System (TCMS) on August 22, 2025. \nAction Taken: The unit was reset, and diagnostic checks revealed a faulty capacitor in \nthe power module. The capacitor was replaced from existing stock. Downtime was 4 \nhours. \n \n3.0 INCIDENT ANALYSIS & SAFETY COMPLIANCE \n3.1 Root Cause Analysis (RCA) of RS-11 Door Sensor Failure \nThe recurring nature of the door sensor fault on Trainset RS-11 points to a systemic issue \nrather than a simple component failure. \nInitial Findings: Preliminary analysis of maintenance logs and TCMS data suggests that the \nsensor failure might be linked to excessive vibration in the door assembly, potentially caused \nby minor track misalignments on the Aluva-Pettah corridor. The wiring harness connecting to \nthe sensor also shows signs of premature wear. \nNext Steps: \n1. Conduct a detailed vibration analysis on the affected door panel during a trial run. \n2. Coordinate with the Permanent Way (P-Way) engineering team to cross-reference \ntrack geometry data for the specific section. \n3. Inspect the wiring harnesses on all trainsets of the same batch (RS-09 to RS-14). \nRecommendation: A proposal for a modified sensor mounting bracket with enhanced \nvibration damping is being drafted. This will be submitted to the Safety Department for \nreview and approval before implementation. \n3.2 Implementation of Safety Circular CMRS/SC/2025/08-A \nDirective: The Commissioner of Metro Rail Safety (CMRS) issued a circular on August 5, \n2025, mandating an additional diagnostic check on the electro-pneumatic brake control \nsystem during every 48-hour inspection cycle. Compliance Action: The maintenance Job \nCards (JCs) and digital checklists on our Maximo Asset Management system have been \nupdated to include this new step. All 45 maintenance technicians have undergone a 2-hour \nbriefing and practical demonstration of the new procedure. Compliance is currently at 100%. \n \n4.0 PROCUREMENT AND SPARES MANAGEMENT \n\nEffective maintenance is critically dependent on the timely availability of spare parts. One \nmajor challenge was encountered this month. \n Issue: Critical delay in the delivery of Insulated Gate Bipolar Transistors (IGBT) \nmodules (Part No. V-MOD-7B4) from vendor 'Apex Electronics'. \n Reference: Purchase Order PO-KMRL/RS/2024/112, dated December 15, 2024. \n Impact: The scheduled delivery date was August 10, 2025. As of September 10, 2025, \nthe consignment has not been received. Our buffer stock for IGBT modules is now \ndown to two units, which is below the mandated safety stock level of five. A failure in \na traction converter without these spares would lead to extended trainset downtime. \n Action Taken: Sent three official reminders to the vendor. Held two review meetings \nwith the Procurement Department to escalate the issue. Initiated discussions with the \nFinance Department regarding the invocation of the penalty clause for delayed \ndelivery as outlined in the PO. \n Request: The Procurement Department is requested to provide an urgent and \ndefinitive delivery timeline or explore alternative emergency sourcing options. \n \n5.0 SPECIAL PROJECTS & MANPOWER PLANNING \n5.1 Aluva Depot Expansion - Phase 2 \n Update: The engineering team has completed the review of the technical \nspecifications for the new automated train wash plant. \n Coordination: Feedback on the preliminary civil engineering drawings (Drawing No. \nAD-E/CIV/004 Rev 2) has been provided to the Civil Engineering department, with \nspecific inputs on service pit dimensions and power supply requirements. \n5.2 Pilot Project: IoT-based Predictive Maintenance \n Objective: To install vibration and temperature sensors on the traction motors of two \ntrainsets (RS-21 and RS-22) to pilot a predictive maintenance program, in line with \nKMRL's integration with the Unified Namespace (UNS). \n Status: The project proposal, including a detailed cost-benefit analysis, has been \napproved. The next step is vendor selection for the sensor hardware. \n Manpower Requirement: This project requires personnel with skills in data analysis \nand sensor technology. A formal manpower request for two (2) 'Senior Technicians - \nData Systems' has been raised and sent to the HR Department for initiating the \nrecruitment process. \n \n6.0 SUMMARY OF KEY ACTION ITEMS & INTER-DEPARTMENTAL \nDEPENDENCIES \nThis section summarizes the critical action items requiring follow-up and highlights the \nresponsible departments. \n\n Action Item 1 Action Item ID: ACT-01 Description: Finalize RCA report for RS-11 \ndoor sensor and submit design modification proposal. Primary Owning Dept: \nEngineering (RS) Dependent Dept: Safety Target Date: Oct 15, 2025 \n Action Item 2 Action Item ID: ACT-02 Description: Expedite the delivery of IGBT \nmodules under PO-KMRL/RS/2024/112. Primary Owning Dept: Procurement \nDependent Dept: Engineering (RS) Target Date: Sep 25, 2025 \n Action Item 3 Action Item ID: ACT-03 Description: Provide an opinion on invoking \nthe penalty clause for the delayed PO. Primary Owning Dept: Finance Dependent \nDept: Procurement Target Date: Sep 30, 2025 \n Action Item 4 Action Item ID: ACT-04 Description: Initiate and fast-track the \nrecruitment process for 2 Senior Technicians (Data Systems). Primary Owning Dept: \nHuman Resources Dependent Dept: Engineering (RS) Target Date: Nov 15, 2025 \n Action Item 5 Action Item ID: ACT-05 Description: Approve budget allocation for \nthe IoT-based Predictive Maintenance pilot project. Primary Owning Dept: Finance \nDependent Dept: Engineering (RS) Target Date: Oct 10, 2025 \n Action Item 6 Action Item ID: ACT-06 Description: Review and incorporate \nfeedback on the depot expansion drawings (AD-E/CIV/004 Rev 2). Primary Owning \nDept: Engineering (Civil) Dependent Dept: Engineering (RS) Target Date: Oct 20, \n2025 \nThis report is submitted for your review and necessary directives.",
    "createdAt": "2025-09-30T10:11:06.672Z",
    "updatedAt": "2025-09-30T10:11:06.672Z"
  },
  {
    "_id": "632b4e9a6e1b4a001f2e3d4d",
    "fileName": "HR_Onboarding_Manual_v3.docx",
    "fileType": "application/msword",
    "fileSize": 876543,
    "storageKey": "uploads/2025/09/hr_onboarding_manual_v3.docx",
    "status": "completed",
    "analysis": {
      "generalSummary": "A comprehensive guide for new employee onboarding procedures.",
      "urgency": "Low",
      "actionItems": ["Update contact list for the IT department"],
      "keyDates": [
        { "date": "2026-01-01", "event": "New onboarding policies become effective" }
      ],
      "departments": ["HR"],
      "summaries": {
        "HR": "The manual covers company policies, benefits enrollment, and first-week checklists for new hires."
      }
    },
    "createdAt": "2025-09-21T10:05:00.000Z",
    "updatedAt": "2025-09-21T10:05:00.000Z"
  },
  {
    "_id": "632b4f1c6e1b4a001f2e3d4e",
    "fileName": "Legal_NDA_Template.pdf",
    "fileType": "application/pdf",
    "fileSize": 450123,
    "storageKey": "uploads/2025/09/legal_nda_template.pdf",
    "status": "completed",
    "analysis": {
      "generalSummary": "Standard non-disclosure agreement template for third-party contractors.",
      "urgency": "Medium",
      "actionItems": ["Review confidentiality clause with the legal team"],
      "keyDates": [],
      "departments": ["Legal"],
      "summaries": {
        "Legal": "A standard template ensuring the protection of company proprietary information."
      }
    },
    "createdAt": "2025-09-20T15:30:12.345Z",
    "updatedAt": "2025-09-20T15:30:12.345Z"
  },
  {
    "_id": "632b50006e1b4a001f2e3d4f",
    "fileName": "Maintenance_Report_Sept.pdf",
    "fileType": "application/pdf",
    "fileSize": 210987,
    "storageKey": "uploads/2025/09/maintenance_report_sept.pdf",
    "status": "completed",
    "analysis": {
      "generalSummary": "Weekly maintenance and systems check report for all metro lines.",
      "urgency": "High",
      "actionItems": ["Address signal failure on Line 2 immediately", "Order replacement parts for car #304"],
      "keyDates": [
        { "date": "2025-09-28", "event": "Follow-up inspection for Line 2 signals" }
      ],
      "departments": ["Engineering", "Operations"],
      "summaries": {
        "Engineering": "Signal systems on Line 2 require urgent attention. All other systems are nominal.",
        "Operations": "Minor delays reported on Line 2 due to signal issues. Bus bridging was not required."
      }
    },
    "createdAt": "2025-09-19T08:00:00.000Z",
    "updatedAt": "2025-09-19T08:00:00.000Z"
  }
];