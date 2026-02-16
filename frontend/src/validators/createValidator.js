const createValidator = () => {
    const rules = [];

    return {
        add(rule) {
            rules.push(rule);
            return this;
        },

        validate(data) {
            for (const rule of rules) {
                const error = rule(data);
                if (error) {
                    return { isValid: false, error };
                }
            }

            return { isValid: true, error: null };
        },
    };
};

export default createValidator;
