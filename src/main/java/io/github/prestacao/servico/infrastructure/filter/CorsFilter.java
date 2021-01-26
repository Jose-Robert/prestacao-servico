package io.github.prestacao.servico.infrastructure.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import io.github.prestacao.servico.application.property.CorsProperties;
import lombok.extern.slf4j.Slf4j;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@Slf4j
public class CorsFilter implements Filter {

    @Autowired
    private CorsProperties corsProperties;

    private FilterConfig filterConfig;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        log.info("Starting a transaction for req : {} - {}", httpServletRequest.getMethod(),
                httpServletRequest.getRequestURI());
        httpServletResponse.setHeader("Access-Control-Allow-Origin", corsProperties.getAllowedOrigin());
        httpServletResponse.setHeader("Access-Control-Allow-Credentials", "true");

        if ("OPTIONS".equals(httpServletRequest.getMethod()) && hasSameOrigin(httpServletRequest)) {
            httpServletResponse.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
            httpServletResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
            httpServletResponse.setHeader("Access-Control-Max-Age", "3600");
            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(request, response);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) {
        this.filterConfig = filterConfig;
    }

    public FilterConfig getFilterConfig() {
        return filterConfig;
    }

    private boolean hasSameOrigin(HttpServletRequest httpServletRequest) {
        return corsProperties.getAllowedOrigin().equals(httpServletRequest.getHeader("Origin"))
                || corsProperties.getAllowedOrigin().equals("*");
    }

    @Override
    public void destroy() {
    	throw new UnsupportedOperationException();
    }

}
