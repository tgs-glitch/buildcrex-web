// BuildCrex Safety Analysis Module
// Based on Quebec Safety Code for Construction Industry (S-2.1, r. 4)
// With Bilingual Support (English/French)

// ===== SAFETY CODE DATA =====
const QuebecSafetyCode = {
    // High-risk construction site definitions (§ 1.1.8)
    highRiskCriteria: {
        excavationDepth: 6, // meters
        trenchLength: 50, // meters
        waterSewerLength: 50, // meters
        buildingHeight: 15, // meters
        electricalDistance: 3, // meters from lines over 750V
        waterDepth: 1.2, // meters
        waterFlow: 0.51, // m/s
    },
    
    // PPE Requirements by work type
    ppeRequirements: {
        general: [
            'Safety helmet (hard hat) - CSA Z94.1',
            'High-visibility safety vest - CSA Z96',
            'Safety boots with toe protection - CSA Z195',
            'Safety glasses - CSA Z94.3'
        ],
        height: [
            'Full body safety harness - CSA Z259.10',
            'Lanyard with energy absorber - CSA Z259.11',
            'Anchorage system - CSA Z259.16',
            'Non-slip safety footwear'
        ],
        excavation: [
            'Protective headgear with chin strap',
            'High-visibility clothing Class 2 or 3',
            'Steel-toed boots',
            'Emergency communication device'
        ],
        electrical: [
            'Insulated gloves - Class appropriate for voltage',
            'Arc flash rated clothing',
            'Face shield with arc rating',
            'Insulated tools'
        ],
        confined: [
            'Supplied air respirator or SCBA',
            'Full body harness with retrieval line',
            'Gas detection monitor',
            'Communication equipment'
        ],
        demolition: [
            'Respiratory protection (N95 minimum)',
            'Eye and face protection',
            'Hearing protection',
            'Steel-toed boots with ankle support'
        ],
        asbestos: [
            'Powered air-purifying respirator (PAPR)',
            'Disposable coveralls with hood',
            'Gloves (disposable)',
            'Decontamination facility access'
        ]
    },
    
    // Safety directives by project type
    directives: {
        new_construction: {
            title: 'New Construction Safety Requirements',
            items: [
                {
                    code: '§ 2.4.1',
                    title: 'Site Notification',
                    description: 'Principal contractor must notify CNESST in writing at least 10 days before site opening.',
                    priority: 'high'
                },
                {
                    code: '§ 2.7',
                    title: 'Public Safety',
                    description: 'Construction site must be separated from public access by covered passage (<2m) or protective wall (≥2m).',
                    priority: 'high'
                },
                {
                    code: '§ 2.8',
                    title: 'Traffic Control',
                    description: 'Plan vehicle traffic to restrict backup maneuvers. Set up safety measures and inform all personnel.',
                    priority: 'medium'
                },
                {
                    code: '§ 3.1',
                    title: 'Site Access',
                    description: 'Maintain safe access routes. Secure site perimeter when work is not in progress.',
                    priority: 'medium'
                },
                {
                    code: '§ 3.2',
                    title: 'Housekeeping',
                    description: 'Keep site clean and free of debris. Store materials safely.',
                    priority: 'medium'
                }
            ]
        },
        renovation: {
            title: 'Renovation Safety Requirements',
            items: [
                {
                    code: '§ 2.4.1',
                    title: 'Site Notification',
                    description: 'Notify CNESST at least 10 days before work begins.',
                    priority: 'high'
                },
                {
                    code: '§ 2.7',
                    title: 'Public Protection',
                    description: 'Protect public from falling objects and construction hazards.',
                    priority: 'high'
                },
                {
                    code: '§ 3.4',
                    title: 'Fire Protection',
                    description: 'Provide fire extinguishers and ensure clear access. No open flames without permit.',
                    priority: 'high'
                },
                {
                    code: '§ 3.18',
                    title: 'Demolition Precautions',
                    description: 'Secure work area. Protect adjacent structures. Control dust.',
                    priority: 'medium'
                }
            ]
        },
        demolition: {
            title: 'Demolition Safety Requirements',
            items: [
                {
                    code: '§ 2.4.1(1.3)',
                    title: 'Emergency Demolition Notice',
                    description: 'For demolition ordered by fire service, notify CNESST at least 6 hours before work.',
                    priority: 'high'
                },
                {
                    code: '§ 2.4.2',
                    title: 'Engineering Assessment',
                    description: 'Structural assessment required before demolition. Submit plans to CNESST.',
                    priority: 'high'
                },
                {
                    code: '§ 3.18',
                    title: 'Demolition Procedures',
                    description: 'Work from top down. Secure area. Protect adjacent structures.',
                    priority: 'high'
                },
                {
                    code: '§ 3.23',
                    title: 'Asbestos Assessment',
                    description: 'Survey for asbestos-containing materials before demolition.',
                    priority: 'high'
                },
                {
                    code: '§ 2.7',
                    title: 'Public Safety Barriers',
                    description: 'Establish exclusion zones. Post warning signs.',
                    priority: 'high'
                }
            ]
        },
        excavation: {
            title: 'Excavation & Trenching Safety',
            items: [
                {
                    code: '§ 3.15.3',
                    title: 'Shoring Requirements',
                    description: 'Excavations ≥1.2m deep require shoring if slope cannot be maintained at safe angle.',
                    priority: 'high'
                },
                {
                    code: '§ 3.15.4',
                    title: 'Soil Assessment',
                    description: 'Classify soil type. Assess stability before entry.',
                    priority: 'high'
                },
                {
                    code: '§ 3.15.5',
                    title: 'Spoil Placement',
                    description: 'Keep excavated material at least 1m from edge.',
                    priority: 'medium'
                },
                {
                    code: '§ 3.15.6',
                    title: 'Atmospheric Testing',
                    description: 'Test for hazardous atmospheres before entry and periodically.',
                    priority: 'high'
                },
                {
                    code: '§ 3.15.7',
                    title: 'Emergency Rescue',
                    description: 'Have rescue equipment readily available. Designate rescue personnel.',
                    priority: 'high'
                }
            ]
        },
        steel_erection: {
            title: 'Steel Structure Erection Safety',
            items: [
                {
                    code: '§ 3.24.8',
                    title: 'Erection Plan',
                    description: 'Submit detailed erection plan signed by engineer to CNESST.',
                    priority: 'high'
                },
                {
                    code: '§ 3.24.9',
                    title: 'Fall Protection',
                    description: '100% tie-off required when working at height. Use positioning devices.',
                    priority: 'high'
                },
                {
                    code: '§ 3.24.10',
                    title: 'Connector Safety',
                    description: 'Connectors must work from platforms or use fall protection.',
                    priority: 'high'
                },
                {
                    code: '§ 3.24.11',
                    title: 'Hoisting Safety',
                    description: 'Rigging inspection required. Use tag lines for control.',
                    priority: 'medium'
                },
                {
                    code: '§ 3.24.12',
                    title: 'Structural Stability',
                    description: 'Do not load structure until properly secured and braced.',
                    priority: 'high'
                }
            ]
        },
        concrete: {
            title: 'Concrete Formwork Safety',
            items: [
                {
                    code: '§ 6.1',
                    title: 'Shoring Drawing',
                    description: 'Submit shoring plans signed by engineer before concrete placement.',
                    priority: 'high'
                },
                {
                    code: '§ 6.2',
                    title: 'Formwork Inspection',
                    description: 'Inspect formwork before concrete placement. Check for defects.',
                    priority: 'high'
                },
                {
                    code: '§ 6.4',
                    title: 'Material Standards',
                    description: 'Use materials meeting CSA or equivalent standards.',
                    priority: 'medium'
                },
                {
                    code: '§ 6.9',
                    title: 'Stripping Sequence',
                    description: 'Follow engineered stripping sequence. Do not remove supports prematurely.',
                    priority: 'high'
                }
            ]
        },
        electrical: {
            title: 'Electrical Work Safety',
            items: [
                {
                    code: '§ 5.1',
                    title: 'Scope Assessment',
                    description: 'Identify all electrical hazards before work begins.',
                    priority: 'high'
                },
                {
                    code: '§ 5.2',
                    title: 'Minimum Approach Distances',
                    description: 'Maintain required distances from energized lines.',
                    priority: 'high'
                },
                {
                    code: '§ 2.10',
                    title: 'Lockout/Tagout',
                    description: 'De-energize and lock out circuits before work. Verify zero energy.',
                    priority: 'high'
                },
                {
                    code: '§ 2.11',
                    title: 'Electrical Safety Training',
                    description: 'Workers must be qualified for electrical work.',
                    priority: 'high'
                }
            ]
        },
        underground: {
            title: 'Underground Work Safety',
            items: [
                {
                    code: '§ 8.1',
                    title: 'Fire Prevention',
                    description: 'Implement fire prevention plan. Provide fire suppression equipment.',
                    priority: 'high'
                },
                {
                    code: '§ 8.2',
                    title: 'Ground Stability',
                    description: 'Monitor ground conditions. Install ground support as needed.',
                    priority: 'high'
                },
                {
                    code: '§ 8.3',
                    title: 'Ventilation',
                    description: 'Provide adequate ventilation. Monitor air quality continuously.',
                    priority: 'high'
                },
                {
                    code: '§ 8.11',
                    title: 'Communication',
                    description: 'Maintain continuous communication with surface.',
                    priority: 'high'
                },
                {
                    code: '§ 8.12',
                    title: 'Emergency Measures',
                    description: 'Establish emergency procedures. Conduct drills.',
                    priority: 'high'
                }
            ]
        }
    },
    
    // Fall protection requirements (§ 2.9)
    fallProtection: {
        threshold: 3, // meters
        requirements: [
            'Guardrails (top rail 1.07m, mid-rail, toe board)',
            'Safety net systems - CSA Z259.2.2',
            'Personal fall arrest systems - CSA Z259.16',
            'Travel restraint systems - CSA Z259.17',
            'Work positioning systems - CSA Z259.14'
        ]
    },
    
    // Scaffolding requirements (§ 3.9)
    scaffolding: {
        woodHeight: 9, // meters - requires engineer plans
        metalHeight: 18, // meters - requires engineer plans
        requirements: [
            'Erected by competent person',
            'Inspected before use',
            'Plumb and level',
            'Fully planked platforms',
            'Guardrails on all open sides',
            'Access ladders secured'
        ]
    }
};

// ===== PROJECT SAFETY DATA =====
let currentProject = {
    name: '',
    type: '',
    location: '',
    duration: '',
    description: '',
    workEnvironment: {
        height: false,
        confined: false,
        electrical: false,
        excavation: false,
        asbestos: false,
        public: false
    },
    characteristics: {
        maxHeight: 0,
        excavationDepth: 0,
        workerCount: 1
    }
};

let riskAssessment = {
    high: [],
    medium: [],
    low: []
};

let safetyChecklist = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    const projectForm = document.getElementById('projectSafetyForm');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processProjectDetails();
        });
    }
});

// ===== PROJECT DETAILS PROCESSING =====
function processProjectDetails() {
    // Collect form data
    currentProject.name = document.getElementById('projectName').value;
    currentProject.type = document.getElementById('projectType').value;
    currentProject.location = document.getElementById('projectLocation').value;
    currentProject.duration = document.getElementById('projectDuration').value;
    currentProject.description = document.getElementById('projectDescription').value;
    
    // Work environment
    currentProject.workEnvironment.height = document.getElementById('workHeight').checked;
    currentProject.workEnvironment.confined = document.getElementById('workConfined').checked;
    currentProject.workEnvironment.electrical = document.getElementById('workElectrical').checked;
    currentProject.workEnvironment.excavation = document.getElementById('workExcavation').checked;
    currentProject.workEnvironment.asbestos = document.getElementById('workAsbestos').checked;
    currentProject.workEnvironment.public = document.getElementById('workPublic').checked;
    
    // Characteristics
    currentProject.characteristics.maxHeight = parseFloat(document.getElementById('maxHeight').value) || 0;
    currentProject.characteristics.excavationDepth = parseFloat(document.getElementById('excavationDepth').value) || 0;
    currentProject.characteristics.workerCount = parseInt(document.getElementById('workerCount').value) || 1;
    
    // Perform risk assessment
    performRiskAssessment();
    
    // Generate safety checklist
    generateSafetyChecklist();
    
    // Update progress
    updateProgress(2);
    
    // Show assessment tab
    showTab('assessmentTab');
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification(typeof t === 'function' ? t('notif_directives_generated') : 'Risk assessment generated.');
    }
}

// ===== RISK ASSESSMENT =====
function performRiskAssessment() {
    riskAssessment = { high: [], medium: [], low: [] };
    
    // Check for high-risk conditions based on Quebec Safety Code
    
    // High-risk: Excavation depth >= 6m
    if (currentProject.characteristics.excavationDepth >= QuebecSafetyCode.highRiskCriteria.excavationDepth) {
        riskAssessment.high.push({
            factor: 'Deep Excavation',
            description: `Excavation depth (${currentProject.characteristics.excavationDepth}m) meets or exceeds 6m threshold for high-risk construction site.`,
            code: '§ 1.1.8(a)'
        });
    }
    
    // High-risk: Work at height >= 15m
    if (currentProject.characteristics.maxHeight >= QuebecSafetyCode.highRiskCriteria.buildingHeight) {
        riskAssessment.high.push({
            factor: 'High-Rise Construction',
            description: `Building height (${currentProject.characteristics.maxHeight}m) meets or exceeds 15m threshold for high-risk site.`,
            code: '§ 1.1.8(g)'
        });
    }
    
    // High-risk: Demolition
    if (currentProject.type === 'demolition') {
        riskAssessment.high.push({
            factor: 'Demolition Work',
            description: 'Demolition is classified as high-risk construction work.',
            code: '§ 1.1.8(f)'
        });
    }
    
    // High-risk: Underground work
    if (currentProject.type === 'underground') {
        riskAssessment.high.push({
            factor: 'Underground Work Site',
            description: 'Underground excavation work is classified as high-risk.',
            code: '§ 1.1.8(d)'
        });
    }
    
    // High-risk: Asbestos work
    if (currentProject.workEnvironment.asbestos) {
        riskAssessment.high.push({
            factor: 'Asbestos Potential',
            description: 'Work involving potential asbestos exposure requires specialized procedures.',
            code: '§ 3.23'
        });
    }
    
    // High-risk: Electrical proximity
    if (currentProject.workEnvironment.electrical) {
        riskAssessment.high.push({
            factor: 'Electrical Hazards',
            description: 'Work near electrical lines requires special precautions.',
            code: '§ 5.1 - 5.3'
        });
    }
    
    // Medium risk: Work at height (3m+)
    if (currentProject.workEnvironment.height || currentProject.characteristics.maxHeight >= 3) {
        if (currentProject.characteristics.maxHeight < 15) {
            riskAssessment.medium.push({
                factor: 'Work at Height',
                description: `Work at ${currentProject.characteristics.maxHeight}m requires fall protection measures.`,
                code: '§ 2.9'
            });
        }
    }
    
    // Medium risk: Excavation (1.2m+ but < 6m)
    if (currentProject.workEnvironment.excavation || 
        (currentProject.characteristics.excavationDepth >= 1.2 && 
         currentProject.characteristics.excavationDepth < 6)) {
        if (currentProject.characteristics.excavationDepth < 6) {
            riskAssessment.medium.push({
                factor: 'Excavation/Trenching',
                description: `Excavation at ${currentProject.characteristics.excavationDepth}m requires shoring or sloping.`,
                code: '§ 3.15'
            });
        }
    }
    
    // Medium risk: Confined space
    if (currentProject.workEnvironment.confined) {
        riskAssessment.medium.push({
            factor: 'Confined Space Entry',
            description: 'Confined space work requires atmospheric testing and rescue plan.',
            code: '§ 3.21'
        });
    }
    
    // Medium risk: Public access
    if (currentProject.workEnvironment.public) {
        riskAssessment.medium.push({
            factor: 'Public Safety',
            description: 'Work near public access requires protective measures.',
            code: '§ 2.7'
        });
    }
    
    // Medium risk: Steel erection
    if (currentProject.type === 'steel_erection') {
        riskAssessment.medium.push({
            factor: 'Steel Erection',
            description: 'Steel erection requires specialized safety procedures.',
            code: '§ 3.24'
        });
    }
    
    // Low risk: General construction
    riskAssessment.low.push({
        factor: 'General Construction',
        description: 'Standard construction safety measures apply.',
        code: '§ 2.4 - 3.14'
    });
    
    // Low risk: Traffic control
    riskAssessment.low.push({
        factor: 'Site Traffic',
        description: 'Vehicle traffic control measures required.',
        code: '§ 2.8'
    });
    
    // Low risk: Housekeeping
    riskAssessment.low.push({
        factor: 'Site Housekeeping',
        description: 'Maintain clean and organized work area.',
        code: '§ 3.2'
    });
    
    // Update display
    updateRiskDisplay();
}

function updateRiskDisplay() {
    // Update counts
    document.getElementById('highRiskCount').textContent = riskAssessment.high.length;
    document.getElementById('mediumRiskCount').textContent = riskAssessment.medium.length;
    document.getElementById('lowRiskCount').textContent = riskAssessment.low.length;
    
    // Update risk list
    const riskList = document.getElementById('riskList');
    if (riskList) {
        let html = '';
        
        // High risks
        riskAssessment.high.forEach(risk => {
            html += `
                <div class="p-4 bg-red-500/20 border-l-4 border-red-500 rounded-r-lg">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-semibold text-red-400">${risk.factor}</p>
                            <p class="text-sm text-gray-300 mt-1">${risk.description}</p>
                        </div>
                        <span class="text-xs bg-red-500/30 px-2 py-1 rounded">${risk.code}</span>
                    </div>
                </div>
            `;
        });
        
        // Medium risks
        riskAssessment.medium.forEach(risk => {
            html += `
                <div class="p-4 bg-yellow-500/20 border-l-4 border-yellow-500 rounded-r-lg">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-semibold text-yellow-400">${risk.factor}</p>
                            <p class="text-sm text-gray-300 mt-1">${risk.description}</p>
                        </div>
                        <span class="text-xs bg-yellow-500/30 px-2 py-1 rounded">${risk.code}</span>
                    </div>
                </div>
            `;
        });
        
        // Low risks
        riskAssessment.low.forEach(risk => {
            html += `
                <div class="p-4 bg-green-500/20 border-l-4 border-green-500 rounded-r-lg">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-semibold text-green-400">${risk.factor}</p>
                            <p class="text-sm text-gray-300 mt-1">${risk.description}</p>
                        </div>
                        <span class="text-xs bg-green-500/30 px-2 py-1 rounded">${risk.code}</span>
                    </div>
                </div>
            `;
        });
        
        riskList.innerHTML = html;
    }
}

// ===== SAFETY CHECKLIST GENERATION =====
function generateSafetyChecklist() {
    safetyChecklist = [];
    const tFunc = typeof t === 'function' ? t : (key) => key;
    
    // General items (all projects)
    safetyChecklist.push(
        { id: 'chk1', text: tFunc('chk_cnesst_notification'), required: true, checked: false },
        { id: 'chk2', text: tFunc('chk_safety_plan'), required: true, checked: false },
        { id: 'chk3', text: tFunc('chk_emergency_procedures'), required: true, checked: false },
        { id: 'chk4', text: tFunc('chk_first_aid'), required: true, checked: false },
        { id: 'chk5', text: tFunc('chk_fire_extinguishers'), required: true, checked: false },
        { id: 'chk6', text: tFunc('chk_site_secure'), required: true, checked: false },
        { id: 'chk7', text: tFunc('chk_sst_training'), required: true, checked: false },
        { id: 'chk8', text: tFunc('chk_ppe_available'), required: true, checked: false }
    );
    
    // Height work checklist items
    if (currentProject.workEnvironment.height || currentProject.characteristics.maxHeight >= 3) {
        safetyChecklist.push(
            { id: 'chk_height1', text: tFunc('chk_fall_protection_plan'), required: true, checked: false },
            { id: 'chk_height2', text: tFunc('chk_guardrails'), required: true, checked: false },
            { id: 'chk_height3', text: tFunc('chk_harnesses'), required: true, checked: false },
            { id: 'chk_height4', text: tFunc('chk_anchorage'), required: true, checked: false },
            { id: 'chk_height5', text: tFunc('chk_ladders'), required: true, checked: false }
        );
    }
    
    // Excavation checklist items
    if (currentProject.workEnvironment.excavation || currentProject.characteristics.excavationDepth >= 1.2) {
        safetyChecklist.push(
            { id: 'chk_exc1', text: tFunc('chk_utilities_located'), required: true, checked: false },
            { id: 'chk_exc2', text: tFunc('chk_soil_classified'), required: true, checked: false },
            { id: 'chk_exc3', text: tFunc('chk_shoring_engineer'), required: currentProject.characteristics.excavationDepth >= 6, checked: false },
            { id: 'chk_exc4', text: tFunc('chk_spoil_placement'), required: true, checked: false },
            { id: 'chk_exc5', text: tFunc('chk_atmospheric_testing'), required: currentProject.characteristics.excavationDepth >= 1.2, checked: false },
            { id: 'chk_exc6', text: tFunc('chk_rescue_equipment'), required: true, checked: false }
        );
    }
    
    // Electrical checklist items
    if (currentProject.workEnvironment.electrical) {
        safetyChecklist.push(
            { id: 'chk_elec1', text: tFunc('chk_electrical_assessment'), required: true, checked: false },
            { id: 'chk_elec2', text: tFunc('chk_approach_distances'), required: true, checked: false },
            { id: 'chk_elec3', text: tFunc('chk_lockout_tagout'), required: true, checked: false },
            { id: 'chk_elec4', text: tFunc('chk_insulated_tools'), required: true, checked: false },
            { id: 'chk_elec5', text: tFunc('chk_arc_flash'), required: true, checked: false }
        );
    }
    
    // Confined space checklist items
    if (currentProject.workEnvironment.confined) {
        safetyChecklist.push(
            { id: 'chk_conf1', text: tFunc('chk_entry_permit'), required: true, checked: false },
            { id: 'chk_conf2', text: tFunc('chk_atmospheric_equipment'), required: true, checked: false },
            { id: 'chk_conf3', text: tFunc('chk_rescue_plan'), required: true, checked: false },
            { id: 'chk_conf4', text: tFunc('chk_ventilation'), required: true, checked: false },
            { id: 'chk_conf5', text: tFunc('chk_attendant'), required: true, checked: false }
        );
    }
    
    // Demolition checklist items
    if (currentProject.type === 'demolition') {
        safetyChecklist.push(
            { id: 'chk_demo1', text: tFunc('chk_structural_assessment'), required: true, checked: false },
            { id: 'chk_demo2', text: tFunc('chk_asbestos_survey'), required: true, checked: false },
            { id: 'chk_demo3', text: tFunc('chk_utilities_disconnected'), required: true, checked: false },
            { id: 'chk_demo4', text: tFunc('chk_exclusion_zone'), required: true, checked: false },
            { id: 'chk_demo5', text: tFunc('chk_dust_control'), required: true, checked: false }
        );
    }
    
    // Steel erection checklist items
    if (currentProject.type === 'steel_erection') {
        safetyChecklist.push(
            { id: 'chk_steel1', text: tFunc('chk_erection_plan'), required: true, checked: false },
            { id: 'chk_steel2', text: tFunc('chk_rigging_inspection'), required: true, checked: false },
            { id: 'chk_steel3', text: tFunc('chk_connector_training'), required: true, checked: false },
            { id: 'chk_steel4', text: tFunc('chk_structural_stability'), required: true, checked: false }
        );
    }
    
    // Asbestos checklist items
    if (currentProject.workEnvironment.asbestos) {
        safetyChecklist.push(
            { id: 'chk_asb1', text: tFunc('chk_asbestos_survey'), required: true, checked: false },
            { id: 'chk_asb2', text: tFunc('chk_asbestos_removal_plan'), required: true, checked: false },
            { id: 'chk_asb3', text: tFunc('chk_decontamination'), required: true, checked: false },
            { id: 'chk_asb4', text: tFunc('chk_air_monitoring'), required: true, checked: false },
            { id: 'chk_asb5', text: tFunc('chk_asbestos_training'), required: true, checked: false }
        );
    }
    
    // Public safety checklist items
    if (currentProject.workEnvironment.public) {
        safetyChecklist.push(
            { id: 'chk_pub1', text: tFunc('chk_protective_barrier'), required: true, checked: false },
            { id: 'chk_pub2', text: tFunc('chk_warning_signs'), required: true, checked: false },
            { id: 'chk_pub3', text: tFunc('chk_traffic_control'), required: true, checked: false }
        );
    }
    
    // Display checklist
    displaySafetyChecklist();
}

function displaySafetyChecklist() {
    const container = document.getElementById('safetyChecklist');
    if (!container) return;
    
    const tFunc = typeof t === 'function' ? t : (key) => key;
    
    let html = '';
    
    // Group by category
    const categories = {
        [tFunc('cat_general')]: safetyChecklist.filter(item => item.id.startsWith('chk') && !item.id.includes('_')),
        [tFunc('cat_fall_protection')]: safetyChecklist.filter(item => item.id.includes('_height')),
        [tFunc('cat_excavation')]: safetyChecklist.filter(item => item.id.includes('_exc')),
        [tFunc('cat_electrical')]: safetyChecklist.filter(item => item.id.includes('_elec')),
        [tFunc('cat_confined_space')]: safetyChecklist.filter(item => item.id.includes('_conf')),
        [tFunc('cat_demolition')]: safetyChecklist.filter(item => item.id.includes('_demo')),
        [tFunc('cat_steel_erection')]: safetyChecklist.filter(item => item.id.includes('_steel')),
        [tFunc('cat_asbestos')]: safetyChecklist.filter(item => item.id.includes('_asb')),
        [tFunc('cat_public_safety')]: safetyChecklist.filter(item => item.id.includes('_pub'))
    };
    
    Object.keys(categories).forEach(category => {
        const items = categories[category];
        if (items.length > 0) {
            html += `<h4 class="font-semibold text-lg mb-3 gradient-text">${category}</h4>`;
            items.forEach(item => {
                html += `
                    <div class="checklist-item">
                        <input type="checkbox" id="${item.id}" 
                               ${item.checked ? 'checked' : ''} 
                               onchange="updateChecklistProgress('${item.id}')">
                        <label for="${item.id}" class="cursor-pointer ${item.required ? 'text-white' : 'text-gray-400'}">
                            ${item.text}
                            ${item.required ? '<span class="text-red-400 text-xs ml-2">*' + tFunc('required') + '</span>' : ''}
                        </label>
                    </div>
                `;
            });
        }
    });
    
    container.innerHTML = html;
    updateChecklistProgressDisplay();
}

function updateChecklistProgress(itemId) {
    const item = safetyChecklist.find(i => i.id === itemId);
    if (item) {
        item.checked = document.getElementById(itemId).checked;
    }
    updateChecklistProgressDisplay();
}

function updateChecklistProgressDisplay() {
    const checked = safetyChecklist.filter(item => item.checked).length;
    const total = safetyChecklist.length;
    const progressEl = document.getElementById('checklistProgress');
    if (progressEl) {
        progressEl.textContent = `${checked}/${total}`;
    }
}

// ===== SAFETY DIRECTIVES GENERATION =====
function generateDirectives() {
    // Update progress
    updateProgress(3);
    
    const tFunc = typeof t === 'function' ? t : (key) => key;
    
    // Populate directive document
    document.getElementById('directiveProjectName').textContent = currentProject.name || '-';
    document.getElementById('directiveProjectType').textContent = formatProjectType(currentProject.type) || '-';
    document.getElementById('directiveLocation').textContent = currentProject.location || '-';
    document.getElementById('directiveDate').textContent = new Date().toLocaleDateString(currentLanguage === 'fr' ? 'fr-CA' : 'en-CA');
    
    // Risk level
    const riskLevelEl = document.getElementById('directiveRiskLevel');
    if (riskAssessment.high.length > 0) {
        riskLevelEl.className = 'p-4 rounded-lg text-center font-bold text-lg bg-red-500/20 text-red-400 border border-red-500/50';
        riskLevelEl.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>HIGH RISK - Enhanced Safety Measures Required';
    } else if (riskAssessment.medium.length > 0) {
        riskLevelEl.className = 'p-4 rounded-lg text-center font-bold text-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/50';
        riskLevelEl.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>MEDIUM RISK - Standard Safety Measures Required';
    } else {
        riskLevelEl.className = 'p-4 rounded-lg text-center font-bold text-lg bg-green-500/20 text-green-400 border border-green-500/50';
        riskLevelEl.innerHTML = '<i class="fas fa-check-circle mr-2"></i>LOW RISK - Basic Safety Measures Required';
    }
    
    // PPE Requirements
    const ppeContainer = document.getElementById('directivePPE');
    let ppeList = [...QuebecSafetyCode.ppeRequirements.general];
    
    if (currentProject.workEnvironment.height || currentProject.characteristics.maxHeight >= 3) {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.height);
    }
    if (currentProject.workEnvironment.excavation) {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.excavation);
    }
    if (currentProject.workEnvironment.electrical) {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.electrical);
    }
    if (currentProject.workEnvironment.confined) {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.confined);
    }
    if (currentProject.type === 'demolition') {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.demolition);
    }
    if (currentProject.workEnvironment.asbestos) {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.asbestos);
    }
    
    // Remove duplicates
    ppeList = [...new Set(ppeList)];
    
    ppeContainer.innerHTML = ppeList.map(ppe => `
        <div class="flex items-center p-3 bg-[#0f172a]/50 rounded-lg">
            <i class="fas fa-hard-hat text-[#FFD700] mr-3"></i>
            <span>${ppe}</span>
        </div>
    `).join('');
    
    // Safety Directives
    const directiveContainer = document.getElementById('directiveList');
    let directives = [];
    
    // Get directives based on project type
    if (currentProject.type && QuebecSafetyCode.directives[currentProject.type]) {
        directives = [...QuebecSafetyCode.directives[currentProject.type].items];
    }
    
    // Add work environment specific directives
    if (currentProject.workEnvironment.height || currentProject.characteristics.maxHeight >= 3) {
        directives.push({
            code: '§ 2.9',
            title: 'Fall Protection',
            description: 'Fall protection required when working at 3m or more above grade. Use guardrails, safety nets, or personal fall arrest systems.',
            priority: 'high'
        });
    }
    
    if (currentProject.workEnvironment.excavation) {
        directives.push({
            code: '§ 3.15',
            title: 'Excavation Safety',
            description: 'Excavations 1.2m or deeper require protective systems. Soil must be classified. Spoil must be kept 1m from edge.',
            priority: 'high'
        });
    }
    
    directiveContainer.innerHTML = directives.map(d => `
        <div class="directive-card">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-lg">${d.title}</h4>
                <span class="text-xs bg-[#FFD700]/20 text-[#FFD700] px-2 py-1 rounded">${d.code}</span>
            </div>
            <p class="text-gray-300">${d.description}</p>
        </div>
    `).join('');
    
    // Show directives tab
    showTab('directivesTab');
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification(tFunc('notif_directives_generated'));
    }
}

// ===== UTILITY FUNCTIONS =====
function formatProjectType(type) {
    const types = {
        'new_construction': 'New Construction',
        'renovation': 'Renovation',
        'demolition': 'Demolition',
        'excavation': 'Excavation/Trenching',
        'steel_erection': 'Steel Structure Erection',
        'concrete': 'Concrete Formwork',
        'electrical': 'Electrical Work',
        'underground': 'Underground Work'
    };
    return types[type] || type;
}

function showTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabId).classList.add('active');
    
    // Update button
    const btnMap = {
        'projectTab': 'projectTabBtn',
        'assessmentTab': 'assessmentTabBtn',
        'directivesTab': 'directivesTabBtn'
    };
    if (btnMap[tabId]) {
        document.getElementById(btnMap[tabId]).classList.add('active');
    }
}

function updateProgress(step) {
    // Update step indicators
    for (let i = 1; i <= 3; i++) {
        const indicator = document.getElementById(`step${i}Indicator`);
        const line = document.getElementById(`line${i}`);
        
        if (i < step) {
            indicator.className = 'progress-step completed text-white';
            indicator.innerHTML = '<i class="fas fa-check"></i>';
            if (line) line.classList.add('bg-[#FFD700]');
        } else if (i === step) {
            indicator.className = 'progress-step active text-[#1a2744]';
            indicator.innerHTML = i;
        } else {
            indicator.className = 'progress-step pending';
            indicator.innerHTML = i;
            if (line) line.classList.remove('bg-[#FFD700]');
        }
    }
}

function printDirectives() {
    window.print();
}

function downloadDirectives() {
    const tFunc = typeof t === 'function' ? t : (key) => key;
    
    // Create a text version of the directives
    const content = `
BUILDCREX - PRE-OPERATIONS SAFETY DIRECTIVE
Quebec Safety Code S-2.1, r. 4 Compliance

PROJECT INFORMATION
-------------------
Project Name: ${currentProject.name}
Project Type: ${formatProjectType(currentProject.type)}
Location: ${currentProject.location}
Date Generated: ${new Date().toLocaleDateString(currentLanguage === 'fr' ? 'fr-CA' : 'en-CA')}

RISK CLASSIFICATION
-------------------
High Risk Items: ${riskAssessment.high.length}
Medium Risk Items: ${riskAssessment.medium.length}
Low Risk Items: ${riskAssessment.low.length}

REQUIRED PPE
------------
${getPPEList().join('\n')}

SAFETY DIRECTIVES
-----------------
${getDirectivesList().join('\n\n')}

EMERGENCY CONTACTS
------------------
CNESST: 1-844-838-0808
Emergency Services: 911
Poison Control: 1-800-463-5060

This safety directive is generated based on Quebec Safety Code for Construction Industry (S-2.1, r. 4).
All workers must review and acknowledge these directives before commencing work.

Prepared by: BuildCrex Safety System
Reference: QSC-S2.1-r4-2025
`;
    
    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Safety_Directive_${currentProject.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (typeof showNotification === 'function') {
        showNotification(tFunc('notif_directives_generated'));
    }
}

function getPPEList() {
    let ppeList = [...QuebecSafetyCode.ppeRequirements.general];
    
    if (currentProject.workEnvironment.height || currentProject.characteristics.maxHeight >= 3) {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.height);
    }
    if (currentProject.workEnvironment.excavation) {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.excavation);
    }
    if (currentProject.workEnvironment.electrical) {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.electrical);
    }
    if (currentProject.workEnvironment.confined) {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.confined);
    }
    if (currentProject.type === 'demolition') {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.demolition);
    }
    if (currentProject.workEnvironment.asbestos) {
        ppeList.push(...QuebecSafetyCode.ppeRequirements.asbestos);
    }
    
    return [...new Set(ppeList)];
}

function getDirectivesList() {
    let directives = [];
    
    if (currentProject.type && QuebecSafetyCode.directives[currentProject.type]) {
        QuebecSafetyCode.directives[currentProject.type].items.forEach(d => {
            directives.push(`[${d.code}] ${d.title}\n${d.description}`);
        });
    }
    
    return directives;
}

// Export functions for global access
window.showTab = showTab;
window.updateChecklistProgress = updateChecklistProgress;
window.generateDirectives = generateDirectives;
window.printDirectives = printDirectives;
window.downloadDirectives = downloadDirectives;