import { rearrangeCypherObject } from '../../utils/utils';
import { getBacentaLastFourBussing, setBacentaIC, setBacentaGraduated, } from './cypher-bacenta-status';
export const setBacentaICStatus = async (last4Bussing, session, bacentaId) => {
    if (last4Bussing.length === 5) {
        last4Bussing.shift();
        if (last4Bussing.every((bussing) => bussing < 8)) {
            await session.run(setBacentaIC, { bacentaId });
        }
    }
};
export const setBacentaGraduatedStatus = async (last4Bussing, session, bacentaId) => {
    if (last4Bussing.length === 5) {
        last4Bussing.pop();
        if (last4Bussing.every((bussing) => bussing > 8)) {
            await session.run(setBacentaGraduated, { bacentaId });
        }
    }
    else if (last4Bussing.every((bussing) => bussing > 8)) {
        await session.run(setBacentaGraduated, { bacentaId });
    }
};
export const setBacentaStatus = async (bacentaId, context) => {
    const session = context.executionContext.session();
    const last4ServicesResponse = rearrangeCypherObject(await session.run(getBacentaLastFourBussing, { bacentaId }), true);
    const bacentaName = {
        id: bacentaId,
        name: last4ServicesResponse[0].bacentaName,
        __typename: last4ServicesResponse[0].bacentaStatus,
        bussingRecord: last4ServicesResponse[0].bussingRecord,
    };
    if (last4ServicesResponse.length < 4) {
        return bacentaName;
    }
    const last4Bussing = last4ServicesResponse.map((bussing) => bussing.bussingRecord);
    if (last4ServicesResponse[0].bacentaStatus.includes('Graduated')) {
        await setBacentaICStatus(last4Bussing, session, bacentaId);
        return {
            ...bacentaName,
            __typename: ['IC', 'Bacenta'],
        };
    }
    if (last4ServicesResponse[0].bacentaStatus.includes('IC')) {
        await setBacentaGraduatedStatus(last4Bussing, session, bacentaId);
        return {
            ...bacentaName,
            __typename: ['Graduated', 'Bacenta'],
        };
    }
    return bacentaName;
};
