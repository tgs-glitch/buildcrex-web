// BuildCrex - Main JavaScript File
// Full-Stack Implementation with Supabase Auth, Localization, Tax Handling, Offline Support, and Admin Features

// ===== SUPABASE AUTHENTICATION =====
const SUPABASE_URL = 'https://rclvilcwfnwuicmtwmiw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbHZpbGN3Zm53dWljbXR3bWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3Njg5OTgsImV4cCI6MjA4NzM0NDk5OH0.-nUmlb2MHJ7neMD_U1iiClYUoAw4horRkw3mYCUKwtI';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Current authenticated user
let currentAuthUser = null;

// Inject spinner styles
(function injectSpinnerStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .spinner {
            border: 3px solid rgba(255, 215, 0, 0.3);
            border-top: 3px solid #FFD700;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-right: 8px;
            vertical-align: middle;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
})();

// ===== BRAND COLORS =====
const BrandColors = {
    navyBlue: '#1a2744',
    navyDark: '#0f172a',
    navyLight: '#243656',
    gold: '#FFD700',
    goldLight: '#FFE55C',
    white: '#FFFFFF'
};

// ===== LOCALIZATION / TRANSLATION SYSTEM =====
const Translations = {
    en: {
        // Navigation
        nav_home: 'Home',
        nav_safety: 'Safety Analysis',
        nav_dashboard: 'Dashboard',
        nav_marketplace: 'Marketplace',
        nav_admin: 'Admin',
        nav_login: 'Login',
        nav_signup: 'Sign Up',
        nav_account: 'My Account',
        
        // Hero Section
        hero_title_1: 'Build Safer.',
        hero_title_2: 'Build Faster.',
        hero_subtitle: "Canada's premier construction compliance and procurement marketplace. Connect, verify, and build with confidence using Quebec Safety Code compliance.",
        hero_cta_start: 'Get Started Today',
        hero_cta_learn: 'Learn More',
        
        // Features Section
        features_title: 'Why Choose BuildCrex',
        features_subtitle: 'Comprehensive construction management with Quebec Safety Code compliance built-in',
        feature_compliance_title: 'Compliance Verification',
        feature_compliance_desc: 'Automated verification of Red Seal, RBQ, WSIB, and Insurance certifications through government database integration.',
        feature_safety_title: 'Safety Code Analysis',
        feature_safety_desc: 'Pre-operations safety directives based on Quebec Safety Code S-2.1, r. 4. Automated risk assessment for every project.',
        feature_escrow_title: 'SafePay Escrow',
        feature_escrow_desc: 'Secure payment processing with milestone-based fund release. Protect both project owners and contractors.',
        feature_preops_title: 'Pre-Ops Safety',
        feature_preops_desc: 'Generate comprehensive safety checklists and directives before starting any construction project.',
        feature_green_title: 'Green Rebates',
        feature_green_desc: 'Access eco-eligible materials and track green building compliance for government rebate programs.',
        feature_marketplace_title: 'Material Marketplace',
        feature_marketplace_desc: 'Browse and purchase construction materials with competitive pricing and verified suppliers.',
        
        // Safety Section
        safety_title: 'Quebec Safety Code Compliance',
        safety_subtitle: 'BuildCrex integrates the latest Quebec Safety Code for Construction Industry (S-2.1, r. 4) to ensure every project meets regulatory requirements before work begins.',
        safety_feature_1: 'Automated safety directive generation based on project type',
        safety_feature_2: 'Pre-operations risk assessment and checklist creation',
        safety_feature_3: 'Compliance tracking for high-risk construction sites',
        safety_feature_4: 'PPE requirements and fall protection guidelines',
        safety_cta: 'Try Safety Analysis',
        
        // About Section
        about_title: "Built for Canada's Construction Industry",
        about_subtitle: 'BuildCrex streamlines the entire construction workflow, from compliance verification to project completion.',
        for_contractors: 'For Contractors',
        for_owners: 'For Project Owners',
        contractor_feature_1: 'Upload and verify certifications',
        contractor_feature_2: 'Bid on verified projects',
        contractor_feature_3: 'Access material marketplace',
        contractor_feature_4: 'Track project milestones',
        contractor_feature_5: 'Receive safety directives',
        owner_feature_1: 'Post projects and receive bids',
        owner_feature_2: 'Verify contractor credentials',
        owner_feature_3: 'Secure escrow payments',
        owner_feature_4: 'Approve milestones and release funds',
        owner_feature_5: 'Ensure safety compliance',
        
        // Footer
        footer_copyright: "© 2025 BuildCrex. Building Canada's future with compliance and confidence.",
        footer_compliance: 'Compliant with Quebec Safety Code S-2.1, r. 4 for Construction Industry',
        footer_privacy: 'Privacy Policy',
        footer_terms: 'Terms of Service',
        footer_contact: 'Contact',
        
        // Login/Signup Modals
        login_title: 'Welcome Back',
        login_email: 'Email',
        login_password: 'Password',
        login_button: 'Login',
        signup_title: 'Create Account',
        signup_company: 'Company Name',
        signup_role: 'Role',
        signup_role_contractor: 'Contractor',
        signup_role_owner: 'Project Owner',
        signup_button: 'Create Account',
        
        // Dashboard
        dashboard_title: 'Dashboard',
        compliance_title: 'Compliance',
        safety_analysis_title: 'Safety Analysis',
        projects_title: 'Projects',
        profile_title: 'Profile',
        quick_stats: 'Quick Stats',
        active_projects: 'Active Projects',
        certifications: 'Certifications',
        total_value: 'Total Value',
        safety_reviews: 'Safety Reviews',
        compliance_status: 'Compliance Status',
        red_seal: 'Red Seal',
        rbq_license: 'RBQ License',
        wsib: 'WSIB',
        insurance: 'Insurance',
        active_projects_section: 'Active Projects',
        progress: 'Progress',
        total: 'Total',
        released: 'Released',
        certification_management: 'Certification Management',
        license: 'License',
        expires: 'Expires',
        current_projects: 'Current Projects',
        available_bids: 'Available Bids',
        budget: 'Budget',
        deadline: 'Deadline',
        submit_bid: 'Submit Bid',
        company_info: 'Company Information',
        subscription: 'Subscription',
        current_plan: 'Current Plan',
        next_billing: 'Next Billing',
        features: 'Features',
        upgrade_enterprise: 'Upgrade to Enterprise',
        update_profile: 'Update Profile',
        
        // Upload Modal
        upload_document: 'Upload Document',
        document_type: 'Document Type',
        select_type: 'Select document type',
        type_red_seal: 'Red Seal Certificate',
        type_rbq: 'RBQ License',
        type_wsib: 'WSIB Clearance',
        type_insurance: 'Insurance Certificate',
        license_number: 'License Number',
        expiry_date: 'Expiry Date',
        upload_file: 'Upload File (Max 5MB)',
        upload_button: 'Upload Document',
        
        // Daily Log Modal
        daily_log_title: 'Daily Log Entry',
        select_project: 'Select project',
        work_completed: 'Work Completed',
        work_placeholder: 'Describe work completed today',
        hours_worked: 'Hours Worked',
        workers_on_site: 'Workers On Site',
        upload_photos: 'Upload Photos (Optional)',
        submit_log: 'Submit Log Entry',
        
        // Weather Conditions (New)
        weather_conditions: 'Weather Conditions',
        weather_clear: 'Clear',
        weather_rain: 'Rain',
        weather_snow: 'Heavy Snow',
        weather_cold: 'Extreme Cold',
        weather_wind: 'High Winds',
        temperature: 'Temperature (°C)',
        
        // Marketplace
        marketplace_title: 'Material Marketplace',
        marketplace_subtitle: 'Discover eco-eligible materials and construction supplies with competitive pricing',
        filters: 'Filters',
        search_products: 'Search Products',
        search_placeholder: 'Search materials...',
        category: 'Category',
        all_categories: 'All Categories',
        cat_concrete: 'Concrete & Cement',
        cat_steel: 'Steel & Metal',
        cat_wood: 'Wood & Lumber',
        cat_insulation: 'Insulation',
        cat_electrical: 'Electrical',
        cat_plumbing: 'Plumbing',
        price_range: 'Price Range',
        min: 'Min',
        max: 'Max',
        eco_eligible_only: 'Eco-Eligible Only',
        in_stock_only: 'In Stock Only',
        clear_filters: 'Clear Filters',
        showing_products: 'Showing',
        products: 'products',
        sort_by: 'Sort by',
        sort_name: 'Sort by Name',
        sort_price_low: 'Price: Low to High',
        sort_price_high: 'Price: High to Low',
        sort_eco: 'Eco-Eligible First',
        shopping_cart: 'Shopping Cart',
        cart_empty: 'Your cart is empty',
        cart_subtotal: 'Subtotal',
        cart_gst: 'GST (5%)',
        cart_qst: 'QST (9.975%)',
        cart_total: 'Total',
        proceed_checkout: 'Proceed to Checkout',
        add_to_cart: 'Add to Cart',
        in_stock: 'in stock',
        out_of_stock: 'Out of stock',
        eco_eligible: 'ECO-ELIGIBLE',
        
        // Safety Analysis Page
        safety_page_title: 'Safety Analysis & Pre-Ops',
        safety_page_subtitle: 'Generate comprehensive safety directives based on Quebec Safety Code S-2.1, r. 4 for Construction Industry. Ensure compliance before work begins.',
        step_1: 'Project Details',
        step_2: 'Risk Assessment',
        step_3: 'Directives',
        project_info: 'Project Information',
        project_name: 'Project Name',
        project_name_placeholder: 'Enter project name',
        project_type: 'Project Type',
        project_location: 'Project Location',
        location_placeholder: 'City, Quebec',
        expected_duration: 'Expected Duration',
        duration_less_month: 'Less than 1 month',
        duration_1_3: '1-3 months',
        duration_3_6: '3-6 months',
        duration_more_6: 'More than 6 months',
        project_description: 'Project Description',
        description_placeholder: 'Brief description of the project scope',
        work_environment: 'Work Environment',
        work_height: 'Work at height (3m+)',
        work_confined: 'Confined space work',
        work_electrical: 'Near electrical lines',
        work_excavation: 'Excavation/Trenching',
        work_asbestos: 'Asbestos potential',
        work_public: 'Public access nearby',
        site_characteristics: 'Site Characteristics',
        max_height_m: 'Max Height (m)',
        excavation_depth_m: 'Excavation Depth (m)',
        workers_on_site_count: 'Workers on Site',
        continue_assessment: 'Continue to Risk Assessment',
        risk_assessment_matrix: 'Risk Assessment Matrix',
        high_risk_items: 'High Risk Items',
        medium_risk_items: 'Medium Risk Items',
        low_risk_items: 'Low Risk Items',
        identified_risk_factors: 'Identified Risk Factors',
        pre_operations_checklist: 'Pre-Operations Safety Checklist',
        completed: 'Completed',
        generate_directives: 'Generate Safety Directives',
        required: 'Required',
        safety_directive_document: 'Pre-Operations Safety Directive',
        print: 'Print',
        download_pdf: 'Download PDF',
        project_information: 'Project Information',
        risk_classification: 'Risk Classification',
        required_ppe: 'Required PPE (Personal Protective Equipment)',
        safety_directives: 'Safety Directives',
        emergency_procedures: 'Emergency Procedures',
        emergency_contacts: 'Emergency Contacts',
        cnesst: 'CNESST',
        emergency_services: 'Emergency Services',
        poison_control: 'Poison Control',
        first_aid_requirements: 'First Aid Requirements',
        first_aid_text: 'First aid kit must be readily accessible. For sites with 50+ workers, a first aid station is required per Quebec Safety Code § 2.4.',
        prepared_by: 'Prepared by',
        reference: 'Reference',
        
        // Admin Panel
        admin_title: 'Admin Control Panel',
        admin_dashboard: 'Admin Dashboard',
        total_users: 'Total Users',
        active_projects_admin: 'Active Projects',
        total_escrow: 'Total Escrow Volume',
        user_verification: 'User Verification',
        pending_verifications: 'Pending Verifications',
        approve: 'Approve',
        reject: 'Reject',
        inventory_management: 'Inventory Management',
        add_product: 'Add Product',
        edit: 'Edit',
        delete: 'Delete',
        product_name: 'Product Name',
        price: 'Price',
        stock_level: 'Stock Level',
        eco_eligible_admin: 'Eco-Eligible',
        actions: 'Actions',
        system_settings: 'System Settings',
        tax_rates: 'Tax Rates',
        gst_rate: 'GST Rate (%)',
        qst_rate: 'QST Rate (%)',
        save_settings: 'Save Settings',
        settings_saved: 'Settings saved successfully',
        
        // Notifications
        notif_login_success: 'Login successful! Welcome to BuildCrex.',
        notif_signup_success: 'Account created successfully! Please verify your email.',
        notif_profile_updated: 'Profile updated successfully!',
        notif_log_submitted: 'Daily log submitted successfully!',
        notif_doc_uploaded: 'Document uploaded successfully!',
        notif_verified: 'Document verified successfully!',
        notif_verification_failed: 'Document verification failed. Please check your document.',
        notif_added_to_cart: 'Added to cart!',
        notif_removed_from_cart: 'Item removed from cart',
        notif_order_placed: 'Order placed successfully!',
        notif_bid_submitted: 'Bid submitted successfully!',
        notif_directives_generated: 'Safety directives generated successfully!',
        notif_offline_saved: 'Saved offline - will sync when connection restored',
        notif_sync_complete: 'Data synced successfully',
        notif_approved: 'Approved successfully',
        notif_rejected: 'Rejected successfully',
        notif_product_added: 'Product added successfully',
        notif_product_updated: 'Product updated successfully',
        notif_product_deleted: 'Product deleted successfully',
        
        // Errors
        error_fill_required: 'Please fill in all required fields.',
        error_file_size: 'File size must be less than 5MB.',
        error_cart_empty: 'Your cart is empty!',
        error_offline: 'You are offline. Changes will be saved locally.',
    },
    
    fr: {
        // Navigation
        nav_home: 'Accueil',
        nav_safety: 'Analyse de Sécurité',
        nav_dashboard: 'Tableau de Bord',
        nav_marketplace: 'Marché',
        nav_admin: 'Admin',
        nav_login: 'Connexion',
        nav_signup: 'Inscription',
        nav_account: 'Mon Compte',
        
        // Hero Section
        hero_title_1: 'Construisez Plus Sûr.',
        hero_title_2: 'Construisez Plus Vite.',
        hero_subtitle: "La première place de marché canadienne pour la conformité et l'approvisionnement en construction. Connectez, vérifiez et construisez en toute confiance avec la conformité au Code de sécurité du Québec.",
        hero_cta_start: 'Commencez Aujourd\'hui',
        hero_cta_learn: 'En Savoir Plus',
        
        // Features Section
        features_title: 'Pourquoi Choisir BuildCrex',
        features_subtitle: 'Gestion complète de la construction avec conformité intégrée au Code de sécurité du Québec',
        feature_compliance_title: 'Vérification de Conformité',
        feature_compliance_desc: 'Vérification automatisée des certifications Sceau Rouge, RBQ, CSST et Assurance via l\'intégration de la base de données gouvernementale.',
        feature_safety_title: 'Analyse du Code de Sécurité',
        feature_safety_desc: 'Directives de sécurité pré-opérations basées sur le Code de sécurité S-2.1, r. 4 du Québec. Évaluation automatique des risques pour chaque projet.',
        feature_escrow_title: 'SafePay Entiercement',
        feature_escrow_desc: 'Traitement des paiements sécurisé avec libération des fonds basée sur les jalons. Protégez les propriétaires de projet et les entrepreneurs.',
        feature_preops_title: 'Sécurité Pré-Opérations',
        feature_preops_desc: 'Générez des listes de contrôle et directives de sécurité complètes avant de commencer tout projet de construction.',
        feature_green_title: 'Remises Écologiques',
        feature_green_desc: 'Accédez aux matériaux éligibles écologiques et suivez la conformité à la construction verte pour les programmes de remise gouvernementaux.',
        feature_marketplace_title: 'Marché de Matériaux',
        feature_marketplace_desc: 'Parcourez et achetez des matériaux de construction avec des prix compétitifs et des fournisseurs vérifiés.',
        
        // Safety Section
        safety_title: 'Conformité au Code de Sécurité du Québec',
        safety_subtitle: 'BuildCrex intègre le dernier Code de sécurité pour l\'industrie de la construction du Québec (S-2.1, r. 4) pour garantir que chaque projet respecte les exigences réglementaires avant le début des travaux.',
        safety_feature_1: 'Génération automatisée de directives de sécurité basée sur le type de projet',
        safety_feature_2: 'Évaluation des risques pré-opérations et création de listes de contrôle',
        safety_feature_3: 'Suivi de conformité pour les chantiers de construction à haut risque',
        safety_feature_4: 'Exigences d\'EPI et directives de protection contre les chutes',
        safety_cta: 'Essayez l\'Analyse de Sécurité',
        
        // About Section
        about_title: "Conçu pour l'Industrie de la Construction du Canada",
        about_subtitle: 'BuildCrex rationalise l\'ensemble du flux de travail de construction, de la vérification de conformité à l\'achèvement du projet.',
        for_contractors: 'Pour les Entrepreneurs',
        for_owners: 'Pour les Propriétaires de Projet',
        contractor_feature_1: 'Téléchargez et vérifiez les certifications',
        contractor_feature_2: 'Soumettez des offres sur des projets vérifiés',
        contractor_feature_3: 'Accédez au marché de matériaux',
        contractor_feature_4: 'Suivez les jalons du projet',
        contractor_feature_5: 'Recevez les directives de sécurité',
        owner_feature_1: 'Publiez des projets et recevez des offres',
        owner_feature_2: 'Vérifiez les credentials des entrepreneurs',
        owner_feature_3: 'Paiements en entiercement sécurisés',
        owner_feature_4: 'Approuvez les jalons et libérez les fonds',
        owner_feature_5: 'Assurez la conformité à la sécurité',
        
        // Footer
        footer_copyright: '© 2025 BuildCrex. Construire l\'avenir du Canada avec conformité et confiance.',
        footer_compliance: 'Conforme au Code de sécurité S-2.1, r. 4 du Québec pour l\'industrie de la construction',
        footer_privacy: 'Politique de Confidentialité',
        footer_terms: 'Conditions d\'Utilisation',
        footer_contact: 'Contact',
        
        // Login/Signup Modals
        login_title: 'Bon Retour',
        login_email: 'Courriel',
        login_password: 'Mot de Passe',
        login_button: 'Connexion',
        signup_title: 'Créer un Compte',
        signup_company: 'Nom de l\'Entreprise',
        signup_role: 'Rôle',
        signup_role_contractor: 'Entrepreneur',
        signup_role_owner: 'Propriétaire de Projet',
        signup_button: 'Créer un Compte',
        
        // Dashboard
        dashboard_title: 'Tableau de Bord',
        compliance_title: 'Conformité',
        safety_analysis_title: 'Analyse de Sécurité',
        projects_title: 'Projets',
        profile_title: 'Profil',
        quick_stats: 'Statistiques Rapides',
        active_projects: 'Projets Actifs',
        certifications: 'Certifications',
        total_value: 'Valeur Totale',
        safety_reviews: 'Révisions de Sécurité',
        compliance_status: 'État de Conformité',
        red_seal: 'Sceau Rouge',
        rbq_license: 'Licence RBQ',
        wsib: 'CSST',
        insurance: 'Assurance',
        active_projects_section: 'Projets Actifs',
        progress: 'Progrès',
        total: 'Total',
        released: 'Libéré',
        certification_management: 'Gestion des Certifications',
        license: 'Licence',
        expires: 'Expire le',
        current_projects: 'Projets en Cours',
        available_bids: 'Appels d\'Offres Disponibles',
        budget: 'Budget',
        deadline: 'Date Limite',
        submit_bid: 'Soumettre une Offre',
        company_info: 'Informations sur l\'Entreprise',
        subscription: 'Abonnement',
        current_plan: 'Plan Actuel',
        next_billing: 'Prochaine Facturation',
        features: 'Fonctionnalités',
        upgrade_enterprise: 'Passer à Entreprise',
        update_profile: 'Mettre à Jour le Profil',
        
        // Upload Modal
        upload_document: 'Télécharger un Document',
        document_type: 'Type de Document',
        select_type: 'Sélectionnez le type de document',
        type_red_seal: 'Certificat Sceau Rouge',
        type_rbq: 'Licence RBQ',
        type_wsib: 'Attestation CSST',
        type_insurance: 'Certificat d\'Assurance',
        license_number: 'Numéro de Licence',
        expiry_date: 'Date d\'Expiration',
        upload_file: 'Télécharger le Fichier (Max 5Mo)',
        upload_button: 'Télécharger le Document',
        
        // Daily Log Modal
        daily_log_title: 'Entrée de Journal Quotidien',
        select_project: 'Sélectionnez le projet',
        work_completed: 'Travail Terminé',
        work_placeholder: 'Décrivez le travail terminé aujourd\'hui',
        hours_worked: 'Heures Travaillées',
        workers_on_site: 'Ouvriers sur le Chantier',
        upload_photos: 'Télécharger des Photos (Optionnel)',
        submit_log: 'Soumettre l\'Entrée de Journal',
        
        // Weather Conditions (New)
        weather_conditions: 'Conditions Météorologiques',
        weather_clear: 'Clair',
        weather_rain: 'Pluie',
        weather_snow: 'Neige Abondante',
        weather_cold: 'Froid Extrême',
        weather_wind: 'Vents Forts',
        temperature: 'Température (°C)',
        
        // Marketplace
        marketplace_title: 'Marché de Matériaux',
        marketplace_subtitle: 'Découvrez des matériaux éligibles écologiques et des fournitures de construction à prix compétitif',
        filters: 'Filtres',
        search_products: 'Rechercher des Produits',
        search_placeholder: 'Rechercher des matériaux...',
        category: 'Catégorie',
        all_categories: 'Toutes les Catégories',
        cat_concrete: 'Béton et Ciment',
        cat_steel: 'Acier et Métal',
        cat_wood: 'Bois et Bois d\'Œuvre',
        cat_insulation: 'Isolation',
        cat_electrical: 'Électrique',
        cat_plumbing: 'Plomberie',
        price_range: 'Plage de Prix',
        min: 'Min',
        max: 'Max',
        eco_eligible_only: 'Uniquement Éligibles Écologiques',
        in_stock_only: 'Uniquement en Stock',
        clear_filters: 'Effacer les Filtres',
        showing_products: 'Affichage de',
        products: 'produits',
        sort_by: 'Trier par',
        sort_name: 'Trier par Nom',
        sort_price_low: 'Prix: Croissant',
        sort_price_high: 'Prix: Décroissant',
        sort_eco: 'Écologiques d\'Abord',
        shopping_cart: 'Panier d\'Achat',
        cart_empty: 'Votre panier est vide',
        cart_subtotal: 'Sous-total',
        cart_gst: 'TPS (5%)',
        cart_qst: 'TVQ (9,975%)',
        cart_total: 'Total',
        proceed_checkout: 'Procéder au Paiement',
        add_to_cart: 'Ajouter au Panier',
        in_stock: 'en stock',
        out_of_stock: 'Rupture de stock',
        eco_eligible: 'ÉCO-ÉLIGIBLE',
        
        // Safety Analysis Page
        safety_page_title: 'Analyse de Sécurité et Pré-Opérations',
        safety_page_subtitle: 'Générez des directives de sécurité complètes basées sur le Code de sécurité S-2.1, r. 4 du Québec. Assurez la conformité avant le début des travaux.',
        step_1: 'Détails du Projet',
        step_2: 'Évaluation des Risques',
        step_3: 'Directives',
        project_info: 'Informations sur le Projet',
        project_name: 'Nom du Projet',
        project_name_placeholder: 'Entrez le nom du projet',
        project_type: 'Type de Projet',
        project_location: 'Emplacement du Projet',
        location_placeholder: 'Ville, Québec',
        expected_duration: 'Durée Prévue',
        duration_less_month: 'Moins d\'1 mois',
        duration_1_3: '1-3 mois',
        duration_3_6: '3-6 mois',
        duration_more_6: 'Plus de 6 mois',
        project_description: 'Description du Projet',
        description_placeholder: 'Brève description de la portée du projet',
        work_environment: 'Environnement de Travail',
        work_height: 'Travail en hauteur (3m+)',
        work_confined: 'Travail en espace confiné',
        work_electrical: 'Près des lignes électriques',
        work_excavation: 'Excavation/Fouille',
        work_asbestos: 'Potentiel d\'amiante',
        work_public: 'Accès public à proximité',
        site_characteristics: 'Caractéristiques du Site',
        max_height_m: 'Hauteur Max (m)',
        excavation_depth_m: 'Profondeur d\'Excavation (m)',
        workers_on_site_count: 'Ouvriers sur le Chantier',
        continue_assessment: 'Continuer vers l\'Évaluation des Risques',
        risk_assessment_matrix: 'Matrice d\'Évaluation des Risques',
        high_risk_items: 'Éléments à Haut Risque',
        medium_risk_items: 'Éléments à Risque Moyen',
        low_risk_items: 'Éléments à Faible Risque',
        identified_risk_factors: 'Facteurs de Risque Identifiés',
        pre_operations_checklist: 'Liste de Contrôle de Sécurité Pré-Opérations',
        completed: 'Terminé',
        generate_directives: 'Générer les Directives de Sécurité',
        required: 'Requis',
        safety_directive_document: 'Directive de Sécurité Pré-Opérations',
        print: 'Imprimer',
        download_pdf: 'Télécharger PDF',
        project_information: 'Informations sur le Projet',
        risk_classification: 'Classification des Risques',
        required_ppe: 'EPI Requis (Équipement de Protection Individuelle)',
        safety_directives: 'Directives de Sécurité',
        emergency_procedures: 'Procédures d\'Urgence',
        emergency_contacts: 'Contacts d\'Urgence',
        cnesst: 'CNESST',
        emergency_services: 'Services d\'Urgence',
        poison_control: 'Centre Anti-Poison',
        first_aid_requirements: 'Exigences de Premiers Soins',
        first_aid_text: 'La trousse de premiers soins doit être facilement accessible. Pour les chantiers avec 50+ ouvriers, une station de premiers soins est requise selon le Code de sécurité § 2.4.',
        prepared_by: 'Préparé par',
        reference: 'Référence',
        
        // Admin Panel
        admin_title: 'Panneau de Contrôle Admin',
        admin_dashboard: 'Tableau de Bord Admin',
        total_users: 'Utilisateurs Totaux',
        active_projects_admin: 'Projets Actifs',
        total_escrow: 'Volume Total d\'Entiercement',
        user_verification: 'Vérification des Utilisateurs',
        pending_verifications: 'Vérifications en Attente',
        approve: 'Approuver',
        reject: 'Rejeter',
        inventory_management: 'Gestion des Stocks',
        add_product: 'Ajouter un Produit',
        edit: 'Modifier',
        delete: 'Supprimer',
        product_name: 'Nom du Produit',
        price: 'Prix',
        stock_level: 'Niveau de Stock',
        eco_eligible_admin: 'Éco-Éligible',
        actions: 'Actions',
        system_settings: 'Paramètres du Système',
        tax_rates: 'Taux de Taxe',
        gst_rate: 'Taux de TPS (%)',
        qst_rate: 'Taux de TVQ (%)',
        save_settings: 'Enregistrer les Paramètres',
        settings_saved: 'Paramètres enregistrés avec succès',
        
        // Notifications
        notif_login_success: 'Connexion réussie! Bienvenue sur BuildCrex.',
        notif_signup_success: 'Compte créé avec succès! Veuillez vérifier votre courriel.',
        notif_profile_updated: 'Profil mis à jour avec succès!',
        notif_log_submitted: 'Journal quotidien soumis avec succès!',
        notif_doc_uploaded: 'Document téléchargé avec succès!',
        notif_verified: 'Document vérifié avec succès!',
        notif_verification_failed: 'Échec de la vérification du document. Veuillez vérifier votre document.',
        notif_added_to_cart: 'Ajouté au panier!',
        notif_removed_from_cart: 'Article retiré du panier',
        notif_order_placed: 'Commande passée avec succès!',
        notif_bid_submitted: 'Offre soumise avec succès!',
        notif_directives_generated: 'Directives de sécurité générées avec succès!',
        notif_offline_saved: 'Enregistré hors ligne - sera synchronisé lorsque la connexion sera rétablie',
        notif_sync_complete: 'Données synchronisées avec succès',
        notif_approved: 'Approuvé avec succès',
        notif_rejected: 'Rejeté avec succès',
        notif_product_added: 'Produit ajouté avec succès',
        notif_product_updated: 'Produit mis à jour avec succès',
        notif_product_deleted: 'Produit supprimé avec succès',
        
        // Errors
        error_fill_required: 'Veuillez remplir tous les champs obligatoires.',
        error_file_size: 'La taille du fichier doit être inférieure à 5Mo.',
        error_cart_empty: 'Votre panier est vide!',
        error_offline: 'Vous êtes hors ligne. Les modifications seront enregistrées localement.',
    }
};

// ===== CURRENT LANGUAGE STATE =====
let currentLanguage = localStorage.getItem('buildcrex_language') || 'en';

// ===== LOCALIZATION FUNCTIONS =====
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('buildcrex_language', lang);
    updatePageLanguage();
    updateLanguageToggle();
}

function toggleLanguage() {
    const newLang = currentLanguage === 'en' ? 'fr' : 'en';
    setLanguage(newLang);
}

function t(key) {
    return Translations[currentLanguage][key] || key;
}

function updatePageLanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
            const translation = t(key);
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.getAttribute('type') === 'submit' || element.getAttribute('type') === 'button') {
                    element.value = translation;
                } else {
                    element.placeholder = translation;
                }
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update all elements with data-i18n-html attribute (for HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        if (key) {
            element.innerHTML = t(key);
        }
    });
    
    // Update document title if it has a translation
    const titleElement = document.querySelector('title[data-i18n-title]');
    if (titleElement) {
        const key = titleElement.getAttribute('data-i18n-title');
        document.title = t(key);
    }
}

function updateLanguageToggle() {
    const toggleEn = document.getElementById('langToggleEn');
    const toggleFr = document.getElementById('langToggleFr');
    
    if (toggleEn && toggleFr) {
        if (currentLanguage === 'en') {
            toggleEn.classList.add('active');
            toggleFr.classList.remove('active');
        } else {
            toggleEn.classList.remove('active');
            toggleFr.classList.add('active');
        }
    }
}

// ===== TAX CONFIGURATION =====
const TaxConfig = {
    gst: 0.05, // 5%
    qst: 0.09975, // 9.975%
    
    getGstRate() {
        const saved = localStorage.getItem('buildcrex_gst_rate');
        return saved ? parseFloat(saved) / 100 : this.gst;
    },
    
    getQstRate() {
        const saved = localStorage.getItem('buildcrex_qst_rate');
        return saved ? parseFloat(saved) / 100 : this.qst;
    },
    
    setGstRate(rate) {
        localStorage.setItem('buildcrex_gst_rate', rate);
    },
    
    setQstRate(rate) {
        localStorage.setItem('buildcrex_qst_rate', rate);
    },
    
    calculateTaxes(subtotal) {
        const gst = subtotal * this.getGstRate();
        const qst = subtotal * this.getQstRate();
        return {
            gst,
            qst,
            total: subtotal + gst + qst
        };
    }
};

// ===== OFFLINE STORAGE MANAGER =====
class OfflineStorageManager {
    constructor() {
        this.syncQueueKey = 'buildcrex_sync_queue';
        this.offlineDataKey = 'buildcrex_offline_data';
        this.isOnline = navigator.onLine;
        
        this.setupEventListeners();
        this.processSyncQueue();
    }
    
    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.showNotification(t('notif_sync_complete'), 'success');
            this.processSyncQueue();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showNotification(t('error_offline'), 'warning');
        });
    }
    
    showNotification(message, type) {
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
        }
    }
    
    saveOffline(dataType, data) {
        const offlineData = this.getOfflineData();
        const timestamp = new Date().toISOString();
        
        const entry = {
            id: Date.now(),
            type: dataType,
            data: data,
            timestamp: timestamp,
            synced: false
        };
        
        offlineData.push(entry);
        localStorage.setItem(this.offlineDataKey, JSON.stringify(offlineData));
        
        // Add to sync queue
        this.addToSyncQueue(entry);
        
        if (!this.isOnline) {
            this.showNotification(t('notif_offline_saved'), 'warning');
        }
        
        return entry;
    }
    
    getOfflineData() {
        const data = localStorage.getItem(this.offlineDataKey);
        return data ? JSON.parse(data) : [];
    }
    
    addToSyncQueue(entry) {
        const queue = this.getSyncQueue();
        queue.push(entry);
        localStorage.setItem(this.syncQueueKey, JSON.stringify(queue));
    }
    
    getSyncQueue() {
        const queue = localStorage.getItem(this.syncQueueKey);
        return queue ? JSON.parse(queue) : [];
    }
    
    clearSyncQueue() {
        localStorage.removeItem(this.syncQueueKey);
    }
    
    async processSyncQueue() {
        if (!this.isOnline) return;
        
        const queue = this.getSyncQueue();
        if (queue.length === 0) return;
        
        for (const entry of queue) {
            try {
                await this.syncEntry(entry);
                entry.synced = true;
            } catch (error) {
                console.error('Sync failed for entry:', entry.id, error);
            }
        }
        
        // Update offline data with sync status
        const offlineData = this.getOfflineData();
        queue.forEach(queueEntry => {
            const offlineEntry = offlineData.find(e => e.id === queueEntry.id);
            if (offlineEntry) {
                offlineEntry.synced = queueEntry.synced;
            }
        });
        localStorage.setItem(this.offlineDataKey, JSON.stringify(offlineData));
        
        // Clear synced items from queue
        const unsynced = queue.filter(e => !e.synced);
        localStorage.setItem(this.syncQueueKey, JSON.stringify(unsynced));
        
        if (queue.some(e => e.synced)) {
            this.showNotification(t('notif_sync_complete'), 'success');
        }
    }
    
    async syncEntry(entry) {
        // Simulate API sync
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Synced entry:', entry.type, entry.id);
                resolve();
            }, 500);
        });
    }
    
    getPendingSyncCount() {
        return this.getSyncQueue().filter(e => !e.synced).length;
    }
}

// Initialize offline storage manager
const offlineStorage = new OfflineStorageManager();

// ===== DATABASE WITH LOCALSTORAGE PERSISTENCE =====
class Database {
    constructor() {
        this.storageKey = 'buildcrex_database';
        this.initializeData();
        this.loadFromStorage();
    }
    
    saveToStorage() {
        const data = {
            users: this.users,
            certifications: this.certifications,
            projects: this.projects,
            availableBids: this.availableBids,
            materials: this.materials,
            safetyDirectives: this.safetyDirectives,
            cart: this.cart,
            currentUserId: this.currentUser?.id
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
    
    loadFromStorage() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.users = data.users || this.users;
                this.certifications = data.certifications || this.certifications;
                this.projects = data.projects || this.projects;
                this.availableBids = data.availableBids || this.availableBids;
                this.materials = data.materials || this.materials;
                this.safetyDirectives = data.safetyDirectives || this.safetyDirectives;
                this.cart = data.cart || [];
                if (data.currentUserId) {
                    this.currentUser = this.users.find(u => u.id === data.currentUserId) || this.users[0];
                }
            } catch (e) {
                console.error('Failed to load database from storage:', e);
            }
        }
    }

    initializeData() {
        // Initialize users
        this.users = [
            {
                id: 1,
                companyName: "ABC Construction",
                email: "contact@abcconstruction.com",
                role: "contractor",
                isVerified: false,
                subscriptionTier: "pro",
                profileImage: null,
                safetyTraining: {
                    sst: true,
                    expiryDate: new Date("2025-12-31")
                }
            },
            {
                id: 2,
                companyName: "Metro Development Corp",
                email: "projects@metrodev.com",
                role: "owner",
                isVerified: true,
                subscriptionTier: "enterprise",
                profileImage: null,
                safetyTraining: null
            },
            {
                id: 3,
                companyName: "Admin User",
                email: "admin@buildcrex.com",
                role: "admin",
                isVerified: true,
                subscriptionTier: "enterprise",
                profileImage: null,
                safetyTraining: null
            }
        ];

        // Initialize certifications
        this.certifications = [
            {
                id: 1,
                userId: 1,
                type: "red_seal",
                licenseNumber: "RS-2024-001",
                expiryDate: new Date("2025-12-31"),
                status: "pending",
                proofDocument: "red_seal_cert.pdf",
                submittedAt: new Date("2024-12-20")
            },
            {
                id: 2,
                userId: 1,
                type: "rbq",
                licenseNumber: "RBQ-2024-4567",
                expiryDate: new Date("2025-08-15"),
                status: "active",
                proofDocument: "rbq_license.pdf",
                submittedAt: new Date("2024-12-15")
            },
            {
                id: 3,
                userId: 1,
                type: "wsib",
                licenseNumber: "WSIB-789012",
                expiryDate: new Date("2025-10-20"),
                status: "active",
                proofDocument: "wsib_clearance.pdf",
                submittedAt: new Date("2024-12-10")
            },
            {
                id: 4,
                userId: 1,
                type: "insurance",
                licenseNumber: "INS-2024-8901",
                expiryDate: new Date("2025-09-30"),
                status: "pending",
                proofDocument: "insurance_cert.pdf",
                submittedAt: new Date("2024-12-18")
            }
        ];

        // Initialize projects with safety data and weather logs
        this.projects = [
            {
                id: 1,
                title: "Downtown Office Complex",
                ownerId: 2,
                contractorId: 1,
                status: "in_progress",
                escrowTotal: 150000,
                escrowReleased: 75000,
                projectLogs: [
                    {
                        date: new Date("2024-12-19"),
                        description: "Foundation work completed",
                        hours: 8,
                        workers: 12,
                        weather: "Clear",
                        temperature: -5
                    },
                    {
                        date: new Date("2024-12-18"),
                        description: "Site preparation",
                        hours: 6,
                        workers: 8,
                        weather: "Heavy Snow",
                        temperature: -12
                    }
                ],
                safety: {
                    riskLevel: "medium",
                    safetyDirectiveId: "SD-001",
                    lastAssessment: new Date("2024-12-15"),
                    checklistCompleted: 15,
                    checklistTotal: 18,
                    incidents: 0
                }
            },
            {
                id: 2,
                title: "Residential Tower A",
                ownerId: 2,
                contractorId: 1,
                status: "milestone_review",
                escrowTotal: 85000,
                escrowReleased: 42500,
                projectLogs: [],
                safety: {
                    riskLevel: "high",
                    safetyDirectiveId: "SD-002",
                    lastAssessment: new Date("2024-12-18"),
                    checklistCompleted: 22,
                    checklistTotal: 28,
                    incidents: 0
                }
            }
        ];

        // Initialize available bids
        this.availableBids = [
            {
                id: 3,
                title: "Shopping Center Renovation",
                ownerId: 2,
                contractorId: null,
                status: "bidding",
                budget: 120000,
                deadline: new Date("2025-02-15"),
                safetyRequired: true
            },
            {
                id: 4,
                title: "School Building Extension",
                ownerId: 2,
                contractorId: null,
                status: "bidding",
                budget: 95000,
                deadline: new Date("2025-03-01"),
                safetyRequired: true
            }
        ];

        // Initialize materials/products
        this.materials = [
            {
                id: 1,
                name: "Portland Cement Type 10",
                price: 12.50,
                category: "concrete",
                isEcoEligible: true,
                stockLevel: 500,
                image: "cement.jpg",
                description: "High-quality Portland cement for general construction use."
            },
            {
                id: 2,
                name: "Rebar Steel Grade 400",
                price: 25.00,
                category: "steel",
                isEcoEligible: false,
                stockLevel: 200,
                image: "rebar.jpg",
                description: "High-strength steel reinforcement bars for concrete structures."
            },
            {
                id: 3,
                name: "Spray Foam Insulation",
                price: 45.00,
                category: "insulation",
                isEcoEligible: true,
                stockLevel: 150,
                image: "insulation.jpg",
                description: "Eco-friendly spray foam insulation with high R-value."
            },
            {
                id: 4,
                name: "Sustainably Sourced Lumber 2x4",
                price: 8.75,
                category: "wood",
                isEcoEligible: true,
                stockLevel: 1000,
                image: "lumber.jpg",
                description: "FSC-certified sustainably sourced lumber for framing."
            },
            {
                id: 5,
                name: "LED Construction Lighting",
                price: 125.00,
                category: "electrical",
                isEcoEligible: true,
                stockLevel: 75,
                image: "led.jpg",
                description: "Energy-efficient LED lighting for construction sites."
            },
            {
                id: 6,
                name: "PEX Plumbing Pipes",
                price: 15.00,
                category: "plumbing",
                isEcoEligible: false,
                stockLevel: 300,
                image: "pex.jpg",
                description: "Flexible PEX pipes for water distribution systems."
            },
            {
                id: 7,
                name: "Recycled Concrete Aggregate",
                price: 18.50,
                category: "concrete",
                isEcoEligible: true,
                stockLevel: 400,
                image: "aggregate.jpg",
                description: "Recycled concrete aggregate for sustainable construction."
            },
            {
                id: 8,
                name: "Galvanized Steel Studs",
                price: 22.00,
                category: "steel",
                isEcoEligible: false,
                stockLevel: 250,
                image: "studs.jpg",
                description: "Corrosion-resistant galvanized steel studs."
            }
        ];

        // Initialize safety directives
        this.safetyDirectives = [
            {
                id: "SD-001",
                projectId: 1,
                projectName: "Downtown Office Complex",
                riskLevel: "medium",
                generatedDate: new Date("2024-12-15"),
                status: "active",
                checklistCompleted: 15,
                checklistTotal: 18
            },
            {
                id: "SD-002",
                projectId: 2,
                projectName: "Residential Tower A",
                riskLevel: "high",
                generatedDate: new Date("2024-12-18"),
                status: "active",
                checklistCompleted: 22,
                checklistTotal: 28
            }
        ];

        // Initialize shopping cart
        this.cart = [];
        this.currentUser = this.users[0];
    }

    // User management
    getCurrentUser() {
        return this.currentUser;
    }
    
    getAllUsers() {
        return this.users;
    }
    
    getPendingCertifications() {
        return this.certifications.filter(cert => cert.status === 'pending');
    }
    
    approveCertification(certId) {
        const cert = this.certifications.find(c => c.id === certId);
        if (cert) {
            cert.status = 'active';
            cert.approvedAt = new Date();
            cert.approvedBy = this.currentUser?.id;
            this.saveToStorage();
            return true;
        }
        return false;
    }
    
    rejectCertification(certId, reason) {
        const cert = this.certifications.find(c => c.id === certId);
        if (cert) {
            cert.status = 'rejected';
            cert.rejectedAt = new Date();
            cert.rejectionReason = reason;
            this.saveToStorage();
            return true;
        }
        return false;
    }

    updateUserVerification() {
        const userCerts = this.certifications.filter(cert => cert.userId === this.currentUser.id);
        const hasRedSeal = userCerts.some(cert => cert.type === 'red_seal' && cert.status === 'active');
        const hasInsurance = userCerts.some(cert => cert.type === 'insurance' && cert.status === 'active');
        
        this.currentUser.isVerified = hasRedSeal && hasInsurance;
        this.saveToStorage();
        return this.currentUser.isVerified;
    }

    // Certification management
    getUserCertifications(userId) {
        return this.certifications.filter(cert => cert.userId === userId);
    }

    updateCertificationStatus(certId, status) {
        const cert = this.certifications.find(c => c.id === certId);
        if (cert) {
            cert.status = status;
            this.updateUserVerification();
            this.saveToStorage();
            return true;
        }
        return false;
    }

    addCertification(certData) {
        const newCert = {
            id: this.certifications.length + 1,
            userId: this.currentUser.id,
            ...certData,
            status: 'pending',
            submittedAt: new Date()
        };
        this.certifications.push(newCert);
        this.saveToStorage();
        return newCert;
    }

    // Project management
    getUserProjects(userId) {
        return this.projects.filter(project => 
            project.ownerId === userId || project.contractorId === userId
        );
    }
    
    getAllProjects() {
        return this.projects;
    }

    getAvailableBids() {
        return this.availableBids;
    }

    updateProjectStatus(projectId, status) {
        const project = [...this.projects, ...this.availableBids].find(p => p.id === projectId);
        if (project) {
            project.status = status;
            this.saveToStorage();
            return true;
        }
        return false;
    }
    
    addProjectLog(projectId, logEntry) {
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
            project.projectLogs.push({
                ...logEntry,
                date: new Date()
            });
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Safety management
    getProjectSafety(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        return project ? project.safety : null;
    }

    getUserSafetyDirectives(userId) {
        const userProjects = this.getUserProjects(userId);
        const projectIds = userProjects.map(p => p.id);
        return this.safetyDirectives.filter(sd => projectIds.includes(sd.projectId));
    }

    // Material/Inventory management
    getMaterials() {
        return this.materials;
    }

    getMaterialById(id) {
        return this.materials.find(m => m.id === id);
    }
    
    addMaterial(materialData) {
        const newMaterial = {
            id: this.materials.length + 1,
            ...materialData
        };
        this.materials.push(newMaterial);
        this.saveToStorage();
        return newMaterial;
    }
    
    updateMaterial(id, updates) {
        const material = this.materials.find(m => m.id === id);
        if (material) {
            Object.assign(material, updates);
            this.saveToStorage();
            return true;
        }
        return false;
    }
    
    deleteMaterial(id) {
        const index = this.materials.findIndex(m => m.id === id);
        if (index > -1) {
            this.materials.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Shopping cart management
    addToCart(materialId, quantity) {
        const material = this.getMaterialById(materialId);
        if (!material) return false;

        const existingItem = this.cart.find(item => item.materialId === materialId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                materialId,
                quantity,
                material
            });
        }
        this.saveToStorage();
        return true;
    }

    removeFromCart(materialId) {
        this.cart = this.cart.filter(item => item.materialId !== materialId);
        this.saveToStorage();
    }

    updateCartQuantity(materialId, quantity) {
        const item = this.cart.find(item => item.materialId === materialId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(materialId);
            } else {
                item.quantity = quantity;
            }
            this.saveToStorage();
            return true;
        }
        return false;
    }

    getCartSubtotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.material.price * item.quantity);
        }, 0);
    }
    
    getCartTotalWithTax() {
        const subtotal = this.getCartSubtotal();
        return TaxConfig.calculateTaxes(subtotal);
    }

    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveToStorage();
    }

    // Admin metrics
    getAdminMetrics() {
        return {
            totalUsers: this.users.length,
            activeProjects: this.projects.filter(p => p.status === 'in_progress').length,
            totalEscrow: this.projects.reduce((sum, p) => sum + p.escrowTotal, 0),
            pendingVerifications: this.getPendingCertifications().length
        };
    }

    // Compliance verification simulation
    async verifyWithGovernmentDatabase(certData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const isValid = Math.random() > 0.15;
                resolve({
                    valid: isValid,
                    message: isValid ? t('notif_verified') : t('notif_verification_failed'),
                    timestamp: new Date()
                });
            }, 2000);
        });
    }
}

// Initialize database
const db = new Database();

// ===== UTILITY FUNCTIONS =====
function formatCurrency(amount) {
    return new Intl.NumberFormat(currentLanguage === 'fr' ? 'fr-CA' : 'en-CA', {
        style: 'currency',
        currency: 'CAD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat(currentLanguage === 'fr' ? 'fr-CA' : 'en-CA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-4 z-50 p-4 rounded-xl shadow-2xl transition-all duration-300 ${
        type === 'success' ? 'bg-gradient-to-r from-green-600 to-green-500' : 
        type === 'warning' ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' :
        type === 'error' ? 'bg-gradient-to-r from-red-600 to-red-500' :
        'bg-gradient-to-r from-blue-600 to-blue-500'
    } text-white font-medium`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${
                type === 'success' ? 'fa-check-circle' : 
                type === 'warning' ? 'fa-exclamation-triangle' :
                type === 'error' ? 'fa-exclamation-circle' :
                'fa-info-circle'
            } mr-3 text-xl"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== MODAL FUNCTIONS =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== AUTHENTICATION FUNCTIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    updatePageLanguage();
    updateLanguageToggle();
    
    // Check existing session
    checkAuthSession();
    
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Login Form Handler - Real Supabase Auth
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const submitBtn = document.getElementById('loginSubmitBtn');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span>Logging in...';
            
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });
                
                if (error) {
                    // Handle specific error cases
                    if (error.message.includes('Email not confirmed')) {
                        alert('Please check your email inbox and confirm your email address before logging in.');
                    } else if (error.message.includes('Invalid login')) {
                        alert('Invalid email or password. Please try again.');
                    } else {
                        alert('Login failed: ' + error.message);
                    }
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = t('login_button');
                    return;
                }
                
                // Login successful
                currentAuthUser = data.user;
                showNotification(t('notif_login_success'));
                closeModal('loginModal');
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = t('login_button');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
                
            } catch (err) {
                console.error('Login error:', err);
                alert('An unexpected error occurred. Please try again.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = t('login_button');
            }
        });
    }
    
    // Signup Form Handler - Real Supabase Auth
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const companyName = document.getElementById('signupCompany').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const role = document.getElementById('signupRole').value;
            const submitBtn = document.getElementById('signupSubmitBtn');
            
            // Validation
            if (!companyName || !email || !password || !role) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span>Creating account...';
            
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: email,
                    password: password,
                    options: {
                        data: {
                            role: role,
                            companyName: companyName
                        }
                    }
                });
                
                if (error) {
                    alert('Signup failed: ' + error.message);
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = t('signup_button');
                    return;
                }
                
                // Signup successful - show email confirmation message
                alert('Account created! Please check your email inbox to confirm your address and activate your account.');
                
                // Reset button and close modal
                submitBtn.disabled = false;
                submitBtn.innerHTML = t('signup_button');
                closeModal('signupModal');
                signupForm.reset();
                
            } catch (err) {
                console.error('Signup error:', err);
                alert('An unexpected error occurred. Please try again.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = t('signup_button');
            }
        });
    }
});

// Check for existing auth session
async function checkAuthSession() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
            console.error('Session check error:', error);
            return;
        }
        
        if (session) {
            currentAuthUser = session.user;
            console.log('User is authenticated:', currentAuthUser.email);
        } else {
            currentAuthUser = null;
        }
    } catch (err) {
        console.error('Session check failed:', err);
    }
}

// Get current authenticated user
function getCurrentAuthUser() {
    return currentAuthUser;
}

// Logout function
async function logoutUser() {
    try {
        await supabase.auth.signOut();
        currentAuthUser = null;
        window.location.href = 'index.html';
    } catch (err) {
        console.error('Logout error:', err);
        window.location.href = 'index.html';
    }
}

// ===== LANDING PAGE FUNCTIONS =====
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== DASHBOARD FUNCTIONS =====
function showSection(sectionName) {
    const sections = ['dashboard', 'compliance', 'safety', 'projects', 'profile'];
    sections.forEach(section => {
        const element = document.getElementById(section + 'Section');
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    const selectedSection = document.getElementById(sectionName + 'Section');
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
    
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const clickedNav = event.currentTarget;
    if (clickedNav) {
        clickedNav.classList.add('active');
    }
    
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        const titles = {
            'dashboard': t('dashboard_title'),
            'compliance': t('compliance_title'),
            'safety': t('safety_analysis_title'),
            'projects': t('projects_title'),
            'profile': t('profile_title')
        };
        pageTitle.textContent = titles[sectionName] || sectionName;
    }
    
    loadSectionData(sectionName);
}

function loadSectionData(sectionName) {
    switch(sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'compliance':
            loadComplianceData();
            break;
        case 'safety':
            loadSafetyData();
            break;
        case 'projects':
            loadProjectsData();
            break;
    }
}

function loadDashboardData() {
    updateComplianceStatus();
    loadActiveProjects();
    loadSafetyReviews();
}

function loadSafetyReviews() {
    const safetyReviewsContainer = document.getElementById('safetyReviews');
    if (!safetyReviewsContainer) return;
    
    const directives = db.getUserSafetyDirectives(db.currentUser.id);
    
    if (directives.length === 0) {
        safetyReviewsContainer.innerHTML = `<p class="text-gray-400 text-center">${t('no_safety_reviews')}</p>`;
        return;
    }
    
    safetyReviewsContainer.innerHTML = directives.map(d => `
        <div class="p-3 bg-[#0f172a]/50 rounded-lg">
            <div class="flex justify-between">
                <span class="font-semibold">${d.projectName}</span>
                <span class="${d.riskLevel === 'high' ? 'text-red-500' : d.riskLevel === 'medium' ? 'text-yellow-500' : 'text-green-500'} text-sm font-semibold">
                    ${d.riskLevel.toUpperCase()} ${t('risk')}
                </span>
            </div>
            <p class="text-sm text-gray-400">${t('generated')}: ${formatDate(d.generatedDate)}</p>
            <div class="mt-2">
                <div class="flex justify-between text-xs text-gray-400 mb-1">
                    <span>${t('checklist_progress')}</span>
                    <span>${d.checklistCompleted}/${d.checklistTotal}</span>
                </div>
                <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-[#FFD700] to-[#FFE55C]" 
                         style="width: ${(d.checklistCompleted / d.checklistTotal) * 100}%"></div>
                </div>
            </div>
        </div>
    `).join('');
}

function updateComplianceStatus() {
    const certifications = db.getUserCertifications(db.currentUser.id);
    const statusConfig = {
        red_seal: { element: 'redSealStatus', dateElement: 'redSealDate' },
        rbq: { element: 'rbqStatus', dateElement: 'rbqDate' },
        wsib: { element: 'wsibStatus', dateElement: 'wsibDate' },
        insurance: { element: 'insuranceStatus', dateElement: 'insuranceDate' }
    };
    
    Object.keys(statusConfig).forEach(certType => {
        const cert = certifications.find(c => c.type === certType);
        const statusElement = document.getElementById(statusConfig[certType].element);
        const dateElement = document.getElementById(statusConfig[certType].dateElement);
        
        if (statusElement && cert) {
            const isActive = cert.status === 'active';
            const isExpired = new Date(cert.expiryDate) < new Date();
            
            statusElement.className = `w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${
                isExpired ? 'bg-red-500' : 
                isActive ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-yellow-500 to-yellow-600'
            }`;
            
            if (dateElement) {
                dateElement.textContent = `${t('expires')}: ${formatDate(cert.expiryDate)}`;
            }
        }
    });
}

function loadActiveProjects() {
    const projectsContainer = document.getElementById('activeProjects');
    if (!projectsContainer) return;
    
    const projects = db.getUserProjects(db.currentUser.id);
    const activeProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'milestone_review');
    
    projectsContainer.innerHTML = activeProjects.map(project => `
        <div class="card p-4">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-lg">${project.title}</h4>
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'in_progress' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }">${project.status.replace('_', ' ')}</span>
            </div>
            ${project.safety ? `
            <div class="mb-3 flex items-center">
                <i class="fas fa-shield-alt mr-2 ${project.safety.riskLevel === 'high' ? 'text-red-500' : project.safety.riskLevel === 'medium' ? 'text-yellow-500' : 'text-green-500'}"></i>
                <span class="text-sm ${project.safety.riskLevel === 'high' ? 'text-red-400' : project.safety.riskLevel === 'medium' ? 'text-yellow-400' : 'text-green-400'}">
                    ${project.safety.riskLevel.toUpperCase()} ${t('risk')}
                </span>
            </div>
            ` : ''}
            <div class="mb-2">
                <div class="flex justify-between text-sm text-gray-300 mb-1">
                    <span>${t('progress')}</span>
                    <span>${Math.round((project.escrowReleased / project.escrowTotal) * 100)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(project.escrowReleased / project.escrowTotal) * 100}%"></div>
                </div>
            </div>
            <div class="flex justify-between text-sm">
                <span>${t('total')}: ${formatCurrency(project.escrowTotal)}</span>
                <span>${t('released')}: ${formatCurrency(project.escrowReleased)}</span>
            </div>
        </div>
    `).join('');
}

function loadComplianceData() {
    const certificationsContainer = document.getElementById('certificationList');
    if (!certificationsContainer) return;
    
    const certifications = db.getUserCertifications(db.currentUser.id);
    
    certificationsContainer.innerHTML = certifications.map(cert => `
        <div class="card p-4">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-semibold text-lg">${t('type_' + cert.type) || cert.type.replace('_', ' ').toUpperCase()}</h4>
                    <p class="text-sm text-gray-300">${t('license')}: ${cert.licenseNumber}</p>
                    <p class="text-sm text-gray-300">${t('expires')}: ${formatDate(cert.expiryDate)}</p>
                </div>
                <div class="text-right">
                    <span class="px-4 py-2 rounded-full text-xs font-bold ${
                        cert.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        cert.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                    }">${cert.status.toUpperCase()}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function loadProjectsData() {
    const currentProjectsContainer = document.getElementById('currentProjects');
    const availableBidsContainer = document.getElementById('availableBids');
    
    if (currentProjectsContainer) {
        const projects = db.getUserProjects(db.currentUser.id);
        currentProjectsContainer.innerHTML = projects.map(project => `
            <div class="card p-4">
                <h4 class="font-semibold mb-2">${project.title}</h4>
                <p class="text-sm text-gray-300 mb-2">${t('status')}: ${project.status.replace('_', ' ')}</p>
                <p class="text-sm">${t('budget')}: ${formatCurrency(project.escrowTotal || project.budget)}</p>
            </div>
        `).join('');
    }
    
    if (availableBidsContainer) {
        const bids = db.getAvailableBids();
        availableBidsContainer.innerHTML = bids.map(bid => `
            <div class="card p-4">
                <h4 class="font-semibold mb-2">${bid.title}</h4>
                <p class="text-sm text-gray-300 mb-2">${t('budget')}: ${formatCurrency(bid.budget)}</p>
                <p class="text-sm text-gray-300 mb-2">${t('deadline')}: ${formatDate(bid.deadline)}</p>
                ${bid.safetyRequired ? `<p class="text-xs text-[#FFD700] mb-2"><i class="fas fa-shield-alt mr-1"></i>${t('safety_directive_required')}</p>` : ''}
                <button class="btn-primary px-4 py-2 rounded text-sm mt-2" onclick="submitBid(${bid.id})">
                    ${t('submit_bid')}
                </button>
            </div>
        `).join('');
    }
}

function loadSafetyData() {
    // Handled by safety.js
}

// ===== COMPLIANCE VERIFICATION WORKFLOW =====
async function processComplianceVerification(certData) {
    try {
        const newCert = db.addCertification(certData);
        
        const verificationResult = await db.verifyWithGovernmentDatabase(certData);
        
        if (verificationResult.valid) {
            db.updateCertificationStatus(newCert.id, 'active');
            showNotification(t('notif_verified'));
        } else {
            db.updateCertificationStatus(newCert.id, 'expired');
            showNotification(t('notif_verification_failed'), 'error');
        }
        
        const isVerified = db.updateUserVerification();
        updateComplianceStatus();
        
        return verificationResult;
    } catch (error) {
        console.error('Compliance verification error:', error);
        showNotification(t('notif_verification_failed'), 'error');
        throw error;
    }
}

// ===== FORM HANDLERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Upload form handler
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const certData = {
                type: this.querySelector('select').value,
                licenseNumber: this.querySelector('input[type="text"]').value,
                expiryDate: new Date(this.querySelector('input[type="date"]').value),
                proofDocument: this.querySelector('input[type="file"]').files[0]?.name
            };
            
            if (!certData.type || !certData.licenseNumber || !certData.expiryDate) {
                showNotification(t('error_fill_required'), 'error');
                return;
            }
            
            const fileInput = this.querySelector('input[type="file"]');
            if (fileInput.files[0] && fileInput.files[0].size > 5 * 1024 * 1024) {
                showNotification(t('error_file_size'), 'error');
                return;
            }
            
            closeModal('uploadModal');
            showNotification(t('notif_doc_uploaded'));
            
            await processComplianceVerification(certData);
            this.reset();
        });
    }
    
    // Daily log form handler with weather
    const logForm = document.getElementById('logForm');
    if (logForm) {
        logForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const projectId = parseInt(this.querySelector('select').value);
            const logEntry = {
                description: this.querySelector('textarea').value,
                hours: parseFloat(this.querySelector('input[type="number"]').value),
                workers: parseInt(this.querySelectorAll('input[type="number"]')[1].value),
                weather: this.querySelector('#weatherConditions')?.value || 'Clear',
                temperature: parseFloat(this.querySelector('#temperature')?.value) || 0
            };
            
            // Save to database
            db.addProjectLog(projectId, logEntry);
            
            // Save offline backup
            offlineStorage.saveOffline('dailyLog', { projectId, ...logEntry });
            
            showNotification(t('notif_log_submitted'));
            closeModal('logModal');
            this.reset();
        });
    }
    
    // Profile form handler
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification(t('notif_profile_updated'));
        });
    }
});

// ===== MARKETPLACE FUNCTIONS =====
let currentMaterials = [];
let filteredMaterials = [];

function loadProducts() {
    currentMaterials = db.getMaterials();
    filteredMaterials = [...currentMaterials];
    displayProducts();
    updateProductCount();
}

function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    productGrid.innerHTML = filteredMaterials.map(material => `
        <div class="product-card cursor-pointer" onclick="showProductDetail(${material.id})">
            ${material.isEcoEligible ? `<div class="eco-badge">${t('eco_eligible')}</div>` : ''}
            <div class="h-48 bg-gradient-to-br from-[#243656] to-[#1a2744] flex items-center justify-center">
                <i class="fas fa-box text-5xl text-gray-500"></i>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${material.name}</h3>
                <p class="text-gray-400 text-sm mb-2">${material.description.substring(0, 80)}...</p>
                <div class="flex justify-between items-center mb-3">
                    <span class="text-2xl font-bold gradient-text">${formatCurrency(material.price)}</span>
                    <span class="text-sm ${material.stockLevel > 100 ? 'text-green-400' : 'text-yellow-400'}">
                        ${material.stockLevel > 0 ? `${material.stockLevel} ${t('in_stock')}` : t('out_of_stock')}
                    </span>
                </div>
                <button onclick="event.stopPropagation(); quickAddToCart(${material.id})" 
                        class="btn-primary w-full py-2.5 rounded-lg ${material.stockLevel === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                        ${material.stockLevel === 0 ? 'disabled' : ''}>
                    <i class="fas fa-cart-plus mr-2"></i>${t('add_to_cart')}
                </button>
            </div>
        </div>
    `).join('');
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const minPrice = parseFloat(document.getElementById('minPrice')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice')?.value) || Infinity;
    const ecoOnly = document.getElementById('ecoFilter')?.checked || false;
    const inStockOnly = document.getElementById('inStockFilter')?.checked || false;
    
    filteredMaterials = currentMaterials.filter(material => {
        const matchesSearch = material.name.toLowerCase().includes(searchTerm) || 
                             material.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || material.category === category;
        const matchesPrice = material.price >= minPrice && material.price <= maxPrice;
        const matchesEco = !ecoOnly || material.isEcoEligible;
        const matchesStock = !inStockOnly || material.stockLevel > 0;
        
        return matchesSearch && matchesCategory && matchesPrice && matchesEco && matchesStock;
    });
    
    displayProducts();
    updateProductCount();
}

function sortProducts() {
    const sortBy = document.getElementById('sortBy')?.value || 'name';
    
    switch(sortBy) {
        case 'price-low':
            filteredMaterials.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredMaterials.sort((a, b) => b.price - a.price);
            break;
        case 'eco':
            filteredMaterials.sort((a, b) => (b.isEcoEligible ? 1 : 0) - (a.isEcoEligible ? 1 : 0));
            break;
        default:
            filteredMaterials.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    displayProducts();
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('ecoFilter').checked = false;
    document.getElementById('inStockFilter').checked = true;
    
    filterProducts();
}

function updateProductCount() {
    const countElement = document.getElementById('productCount');
    if (countElement) {
        countElement.textContent = filteredMaterials.length;
    }
}

// ===== CART FUNCTIONS WITH TAX =====
function quickAddToCart(materialId) {
    const material = db.getMaterialById(materialId);
    if (!material || material.stockLevel === 0) return;
    
    if (db.addToCart(materialId, 1)) {
        showNotification(t('notif_added_to_cart'));
        updateCartDisplay();
    }
}

function showProductDetail(materialId) {
    const material = db.getMaterialById(materialId);
    if (!material) return;
    
    document.getElementById('modalProductName').textContent = material.name;
    document.getElementById('modalProductPrice').textContent = formatCurrency(material.price);
    document.getElementById('modalProductDescription').textContent = material.description;
    document.getElementById('modalStockLevel').textContent = material.stockLevel > 0 ? 
        `${material.stockLevel} ${t('in_stock')}` : t('out_of_stock');
    document.getElementById('modalQuantity').value = 1;
    
    const ecoBadge = document.getElementById('modalEcoBadge');
    if (material.isEcoEligible) {
        ecoBadge.classList.remove('hidden');
    } else {
        ecoBadge.classList.add('hidden');
    }
    
    window.currentProductId = materialId;
    
    openModal('productModal');
}

function addToCartFromModal() {
    const quantity = parseInt(document.getElementById('modalQuantity').value);
    const materialId = window.currentProductId;
    
    if (quantity > 0 && db.addToCart(materialId, quantity)) {
        showNotification(t('notif_added_to_cart'));
        closeModal('productModal');
        updateCartDisplay();
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    
    if (cartSidebar.classList.contains('active')) {
        displayCartItems();
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    const taxBreakdown = db.getCartTotalWithTax();
    
    if (db.cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-gray-400 text-center py-8">${t('cart_empty')}</p>`;
    } else {
        cartItemsContainer.innerHTML = db.cart.map(item => `
            <div class="card p-4 mb-4">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-semibold">${item.material.name}</h4>
                    <button onclick="removeFromCart(${item.materialId})" class="text-red-400 hover:text-red-300">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <button onclick="updateCartQuantity(${item.materialId}, ${item.quantity - 1})" 
                                class="w-8 h-8 bg-[#0f172a] rounded-lg flex items-center justify-center hover:bg-[#FFD700] hover:text-[#1a2744] transition">-</button>
                        <span class="w-8 text-center font-semibold">${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.materialId}, ${item.quantity + 1})" 
                                class="w-8 h-8 bg-[#0f172a] rounded-lg flex items-center justify-center hover:bg-[#FFD700] hover:text-[#1a2744] transition">+</button>
                    </div>
                    <span class="font-semibold gradient-text">${formatCurrency(item.material.price * item.quantity)}</span>
                </div>
            </div>
        `).join('');
    }
    
    // Update tax breakdown
    document.getElementById('cartSubtotal').textContent = formatCurrency(taxBreakdown.gst + taxBreakdown.qst + db.getCartSubtotal() - taxBreakdown.gst - taxBreakdown.qst);
    document.getElementById('cartGST').textContent = formatCurrency(taxBreakdown.gst);
    document.getElementById('cartQST').textContent = formatCurrency(taxBreakdown.qst);
    document.getElementById('cartTotal').textContent = formatCurrency(taxBreakdown.total);
}

function removeFromCart(materialId) {
    db.removeFromCart(materialId);
    showNotification(t('notif_removed_from_cart'));
    displayCartItems();
    updateCartDisplay();
}

function updateCartQuantity(materialId, quantity) {
    db.updateCartQuantity(materialId, quantity);
    displayCartItems();
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = db.getCartCount();
    }
}

function checkout() {
    if (db.cart.length === 0) {
        showNotification(t('error_cart_empty'), 'error');
        return;
    }
    
    showNotification(t('proceeding_checkout'));
    setTimeout(() => {
        db.clearCart();
        updateCartDisplay();
        toggleCart();
        showNotification(t('notif_order_placed'));
    }, 2000);
}

// ===== PROJECT FUNCTIONS =====
function submitBid(projectId) {
    showNotification(t('notif_bid_submitted'));
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'dashboard.html':
            loadDashboardData();
            break;
        case 'marketplace.html':
            loadProducts();
            break;
        case 'admin.html':
            loadAdminData();
            break;
        default:
            break;
    }
    
    updateCartDisplay();
});

// ===== SECURITY FUNCTIONS =====
function validateFileUpload(file) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024;
    
    if (!allowedTypes.includes(file.type)) {
        showNotification(t('error_file_type'), 'error');
        return false;
    }
    
    if (file.size > maxSize) {
        showNotification(t('error_file_size'), 'error');
        return false;
    }
    
    return true;
}

document.addEventListener('change', function(e) {
    if (e.target.type === 'file') {
        const file = e.target.files[0];
        if (file && !validateFileUpload(file)) {
            e.target.value = '';
        }
    }
});

// ===== ESCROW PAYMENT SIMULATION WITH TAX =====
class EscrowManager {
    constructor() {
        this.transactions = [];
    }
    
    async createTransaction(projectId, amount) {
        // Calculate taxes
        const taxes = TaxConfig.calculateTaxes(amount);
        const totalWithTax = taxes.total;
        const fee = totalWithTax * 0.03; // 3% fee on total with tax
        
        const transaction = {
            id: Date.now(),
            projectId,
            amount,
            gst: taxes.gst,
            qst: taxes.qst,
            subtotal: amount,
            totalWithTax: totalWithTax,
            fee,
            grandTotal: totalWithTax + fee,
            status: 'held',
            createdAt: new Date()
        };
        
        this.transactions.push(transaction);
        
        await this.simulatePaymentProcessing(transaction);
        
        return transaction;
    }
    
    async simulatePaymentProcessing(transaction) {
        return new Promise((resolve) => {
            setTimeout(() => {
                transaction.status = 'processed';
                showNotification(t('escrow_processed'));
                resolve(transaction);
            }, 3000);
        });
    }
    
    async releaseFunds(transactionId, contractorId) {
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        
        await this.simulateFundTransfer(transaction);
        
        transaction.status = 'released';
        transaction.releasedAt = new Date();
        
        showNotification(t('funds_released'));
        return transaction;
    }
    
    async simulateFundTransfer(transaction) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(transaction);
            }, 2000);
        });
    }
}

const escrowManager = new EscrowManager();

// ===== ADMIN FUNCTIONS =====
function loadAdminData() {
    loadAdminMetrics();
    loadPendingVerifications();
    loadInventoryManagement();
    loadSystemSettings();
}

function loadAdminMetrics() {
    const metrics = db.getAdminMetrics();
    
    const totalUsersEl = document.getElementById('adminTotalUsers');
    const activeProjectsEl = document.getElementById('adminActiveProjects');
    const totalEscrowEl = document.getElementById('adminTotalEscrow');
    const pendingVerificationsEl = document.getElementById('adminPendingVerifications');
    
    if (totalUsersEl) totalUsersEl.textContent = metrics.totalUsers;
    if (activeProjectsEl) activeProjectsEl.textContent = metrics.activeProjects;
    if (totalEscrowEl) totalEscrowEl.textContent = formatCurrency(metrics.totalEscrow);
    if (pendingVerificationsEl) pendingVerificationsEl.textContent = metrics.pendingVerifications;
}

function loadPendingVerifications() {
    const container = document.getElementById('pendingVerificationsList');
    if (!container) return;
    
    const pending = db.getPendingCertifications();
    
    if (pending.length === 0) {
        container.innerHTML = `<p class="text-gray-400 text-center py-4">${t('no_pending_verifications')}</p>`;
        return;
    }
    
    container.innerHTML = pending.map(cert => {
        const user = db.users.find(u => u.id === cert.userId);
        return `
            <div class="card p-4 mb-3">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-semibold">${user?.companyName || 'Unknown'}</p>
                        <p class="text-sm text-gray-400">${t('type_' + cert.type) || cert.type}</p>
                        <p class="text-sm text-gray-400">${t('license')}: ${cert.licenseNumber}</p>
                        <p class="text-xs text-gray-500">${t('submitted')}: ${formatDate(new Date(cert.submittedAt))}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="approveCertification(${cert.id})" class="btn-primary px-4 py-2 rounded-lg text-sm">
                            <i class="fas fa-check mr-1"></i>${t('approve')}
                        </button>
                        <button onclick="rejectCertification(${cert.id})" class="px-4 py-2 rounded-lg text-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
                            <i class="fas fa-times mr-1"></i>${t('reject')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function approveCertification(certId) {
    if (db.approveCertification(certId)) {
        showNotification(t('notif_approved'));
        loadPendingVerifications();
        loadAdminMetrics();
    }
}

function rejectCertification(certId) {
    if (db.rejectCertification(certId, 'Rejected by admin')) {
        showNotification(t('notif_rejected'));
        loadPendingVerifications();
        loadAdminMetrics();
    }
}

function loadInventoryManagement() {
    const container = document.getElementById('inventoryList');
    if (!container) return;
    
    const materials = db.getMaterials();
    
    container.innerHTML = materials.map(m => `
        <tr class="border-b border-gray-700">
            <td class="py-3">${m.name}</td>
            <td class="py-3">${formatCurrency(m.price)}</td>
            <td class="py-3">${m.stockLevel}</td>
            <td class="py-3">${m.isEcoEligible ? '<i class="fas fa-check text-green-500"></i>' : '<i class="fas fa-times text-gray-500"></i>'}</td>
            <td class="py-3">
                <button onclick="editProduct(${m.id})" class="text-[#FFD700] hover:text-white mr-2"><i class="fas fa-edit"></i></button>
                <button onclick="deleteProduct(${m.id})" class="text-red-500 hover:text-red-400"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function editProduct(id) {
    const material = db.getMaterialById(id);
    if (!material) return;
    
    const newPrice = prompt(t('enter_new_price'), material.price);
    const newStock = prompt(t('enter_new_stock'), material.stockLevel);
    
    if (newPrice !== null && newStock !== null) {
        db.updateMaterial(id, {
            price: parseFloat(newPrice),
            stockLevel: parseInt(newStock)
        });
        showNotification(t('notif_product_updated'));
        loadInventoryManagement();
    }
}

function deleteProduct(id) {
    if (confirm(t('confirm_delete_product'))) {
        db.deleteMaterial(id);
        showNotification(t('notif_product_deleted'));
        loadInventoryManagement();
    }
}

function showAddProductModal() {
    openModal('addProductModal');
}

function loadSystemSettings() {
    const gstInput = document.getElementById('gstRate');
    const qstInput = document.getElementById('qstRate');
    
    if (gstInput) gstInput.value = (TaxConfig.getGstRate() * 100).toFixed(2);
    if (qstInput) qstInput.value = (TaxConfig.getQstRate() * 100).toFixed(3);
}

function saveTaxSettings() {
    const gstRate = parseFloat(document.getElementById('gstRate').value);
    const qstRate = parseFloat(document.getElementById('qstRate').value);
    
    if (!isNaN(gstRate) && !isNaN(qstRate)) {
        TaxConfig.setGstRate(gstRate);
        TaxConfig.setQstRate(qstRate);
        showNotification(t('settings_saved'));
    }
}

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.scrollToFeatures = scrollToFeatures;
window.showSection = showSection;
window.filterProducts = filterProducts;
window.sortProducts = sortProducts;
window.clearFilters = clearFilters;
window.quickAddToCart = quickAddToCart;
window.showProductDetail = showProductDetail;
window.addToCartFromModal = addToCartFromModal;
window.toggleCart = toggleCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.checkout = checkout;
window.submitBid = submitBid;
window.toggleLanguage = toggleLanguage;
window.t = t;
window.approveCertification = approveCertification;
window.rejectCertification = rejectCertification;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.showAddProductModal = showAddProductModal;
window.saveTaxSettings = saveTaxSettings;
window.loadAdminData = loadAdminData;

// Export Supabase auth functions
window.supabase = supabase;
window.getCurrentAuthUser = getCurrentAuthUser;
window.logoutUser = logoutUser;
window.checkAuthSession = checkAuthSession;