const sendEmailFromTwilio = require('./twilio');
const sendEmail = require('./fs');

const CircuitBreakerStates = {
    OPENED: 'OPENED',
    CLOSED: 'CLOSED',
}

class CircuitBreaker {
    constructor() {
        this.request = sendEmailFromTwilio;
        this.state = CircuitBreakerStates.CLOSED;
        this.failureCount = 0;
        this.resetAfter = Date.now();
        this.timeOut = 5000;
    }

    async fire(email) {
        if(this.state === CircuitBreakerStates.OPENED) {
            if(this.resetAfter <= Date.now()) {
                this.request = sendEmailFromTwilio;
            }
        }

        try {
            const response = await this.request(email);
            if(response.success) return this.success(response);
            return this.failure(response)
        } catch (error) {
            return this.failure({error: 'catch', err: error});
        }
    }

    success(data) {
        this.failureCount = 0;

        return data;
    }

    failure(data) {
        this.failureCount += 1;
        console.log('failures: ', this.failureCount);
        if(this.failureCount >= 3) {
            this.state = CircuitBreakerStates.OPENED;
            this.resetAfter = this.timeOut + Date.now();
            this.request = sendEmail;
        }

        return data;
    }
}

module.exports = CircuitBreaker;